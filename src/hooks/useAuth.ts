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
    console.log('email', email, 'password', password, 'userData', userData);
    // try {
    //   // Create auth user
    //   const { data, error } = await supabase.auth.signUp({
    //     email,
    //     password,
    //     options: {
    //       data: {
    //         full_name: userData.full_name,
    //       },
    //     },
    //   });

    //   if (error) throw error;

    //   if (data?.user) {
    //     // Create user profile in users table
    //     const { error: profileError } = await supabase.from('users').insert([
    //       {
    //         id: data.user.id,
    //         email: data.user.email,
    //         ...userData,
    //       },
    //     ]);

    //     if (profileError) throw profileError;

    //     Alert.alert(
    //       'Verification Required',
    //       'Please check your email for a verification link to complete your registration.',
    //     );

    //     return true;
    //   }

    //   return false;
    // } catch (error) {
    //   Alert.alert(
    //     'Signup Failed',
    //     error instanceof Error ? error.message : 'Unknown error occurred',
    //   );
    //   return false;
    // }
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
