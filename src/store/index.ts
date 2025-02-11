import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import storage from '@/utils/storage';

const asyncStorage = {
  setItem: async (name: string, value: string) => {
    await storage.setItem(name, value);
  },
  getItem: async (name: string) => {
    const value = await storage.getItem(name);
    return value ?? null;
  },
  removeItem: async (name: string) => {
    await storage.removeItem(name);
  },
};

interface User {
  // Define user properties here
}

type State = {
  isLoggedIn: boolean;
  user: User;
};

type Actions = {
  reset: () => void;
  setIsLoggedIn: (data: boolean) => void;
  setUser: (data: User) => void;
};

// define the initial state
const initialState: State = {
  isLoggedIn: false,
  user: {} as User,
};

export const useStore = create<State & Actions>()(
  persist(
    set => ({
      ...initialState,
      reset: () => set(initialState),
      setIsLoggedIn: (data: boolean) => set({ isLoggedIn: data }),
      setUser: (data: User) => set({ user: data }),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => asyncStorage),
    },
  ),
);
