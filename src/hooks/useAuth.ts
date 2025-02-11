import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '@/store';

import * as storage from '@/utils/storage';

type LoginData = {
  token: string;
  user: object;
};

export default function useAuth() {
  const router = useRouter();
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const setUser = useStore(state => state.setUser);
  const reset = useStore(state => state.reset);

  const login = async (data: LoginData) => {
    const { token, ...user } = data;

    if (!token) {
      return Alert.alert('Login Failed', 'No token received');
    }

    try {
      // Store token in async storage
      await storage.saveString('token', token);

      // Update store state
      setUser(user);
      setIsLoggedIn(true);

      // Navigate to home screen
      router.replace('/(tabs)/home');
      return true;
    } catch (error) {
      Alert.alert('Login Failed', 'Failed to save login data');
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out');
      // Clear local storage
      await storage.clear();
      // Reset local store
      reset();
      // Navigate back to auth screen
      router.replace('/');
    } catch (e) {
      console.log('Error logging out');
      Alert.alert('Error', 'Error logging out');
    }
  };

  return { login, logout };
}
