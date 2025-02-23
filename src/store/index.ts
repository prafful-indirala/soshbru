import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthUser {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  designation: string | null;
  bio: string | null;
  linkedin_url: string | null;
  github_url: string | null;
}

type ThemeMode = 'light' | 'dark';

interface AppState {
  isLoggedIn: boolean;
  user: AuthUser | null;
  theme: ThemeMode;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: AuthUser) => void;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  reset: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      theme: 'light',
      setIsLoggedIn: value => set({ isLoggedIn: value }),
      setUser: user => set({ user }),
      toggleTheme: () =>
        set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
      setTheme: (theme: ThemeMode) => set({ theme }),
      reset: () => set({ isLoggedIn: false, user: null }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
