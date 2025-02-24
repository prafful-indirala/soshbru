import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/services/supabase';
import { useStore } from '@/store';

type AuthUser = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  designation: string | null;
  bio: string | null;
  linkedin_url: string | null;
  github_url: string | null;
};

export default function useAuth() {
  const router = useRouter();
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const setUser = useStore(state => state.setUser);
  const reset = useStore(state => state.reset);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user && data?.session) {
        // Get additional user data from users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) throw userError;

        setUser(userData as AuthUser);
        setIsLoggedIn(true);
        router.replace('/(tabs)/home');
        return true;
      }

      return false;
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error instanceof Error ? error.message : 'Unknown error occurred',
      );
      return false;
    }
  };

  const signup = async (
    email: string,
    password: string,
    userData: {
      full_name: string;
      designation?: string;
      bio?: string;
      linkedin_url?: string;
      github_url?: string;
    },
  ) => {
    try {
      console.log('Starting signup process...');

      // Create auth user
      // Auto confirm the user's email
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
          },
          emailRedirectTo: 'soshbru://login',
        },
      });

      if (authData?.user) {
        // Force confirm the email
        await supabase.auth.updateUser({
          email_confirm: true,
        });
      }

      if (authError) {
        console.error('Auth signup error:', authError);
        if (authError.message?.includes('rate limit')) {
          throw new Error(
            'Too many signup attempts. Please wait a few minutes before trying again.',
          );
        }
        throw new Error(authError.message);
      }

      if (!authData?.user) {
        console.error('No user data returned from auth signup');
        throw new Error('Failed to create account: No user data returned');
      }

      console.log('Auth signup successful, creating user profile...');

      console.log('Creating user profile with data:', {
        id: authData.user.id,
        email: authData.user.email,
        ...userData,
      });

      // First try just the insert without select
      console.log('Attempting insert with auth user id:', authData.user.id);

      console.log('Starting profile insert...');

      const insertResult = await supabase.from('users').insert({
        id: authData.user.id,
        email: authData.user.email!,
        full_name: userData.full_name,
        designation: userData.designation || null,
        bio: userData.bio || null,
        linkedin_url: userData.linkedin_url || null,
        github_url: userData.github_url || null,
        preferences: {},
        visibility: true,
        is_premium: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        avatar_url: null,
      });

      console.log('Raw insert result:', insertResult);

      if (insertResult.error) {
        console.error('Insert error:', {
          error: insertResult.error,
          status: insertResult.status,
        });
        await supabase.auth.signOut();
        throw new Error(
          insertResult.error.message ||
          `Failed to insert user profile (status: ${insertResult.status})`,
        );
      }

      // Verify profile was created by fetching it
      console.log('Verifying profile creation...');

      const fetchResult = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      console.log('Fetch result:', fetchResult);

      if (fetchResult.error) {
        console.error('Error verifying profile:', {
          error: fetchResult.error,
          status: fetchResult.status,
        });
        await supabase.auth.signOut();
        throw new Error(
          `Failed to verify profile: ${fetchResult.error.message}`,
        );
      }

      if (!fetchResult.data) {
        console.error('No profile data found after creation');
        await supabase.auth.signOut();
        throw new Error('Profile could not be verified after creation');
      }

      console.log('Profile created and verified:', fetchResult.data);

      // Auto sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Auto sign in failed:', signInError);
        throw new Error('Account created but auto sign in failed');
      }

      console.log('Signup and auto sign in completed successfully');

      // Set user state
      setUser(fetchResult.data as AuthUser);
      setIsLoggedIn(true);
      router.replace('/(tabs)/home');

      return true;
    } catch (error) {
      console.error('Signup process error:', error);
      Alert.alert(
        'Signup Failed',
        error instanceof Error ? error.message : 'Unknown error occurred',
      );
      return false;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Reset local store
      reset();
      // Navigate back to auth screen
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
      console.error('Logout error:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'soshbru://reset-password',
      });

      if (error) throw error;

      Alert.alert(
        'Password Reset Email Sent',
        'Please check your email for password reset instructions.',
      );
      return true;
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to send reset email',
      );
      return false;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      Alert.alert('Success', 'Your password has been updated.');
      return true;
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to update password',
      );
      return false;
    }
  };

  return {
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
  };
}
