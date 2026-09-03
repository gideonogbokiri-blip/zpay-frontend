import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AuthSession, User } from '@/lib/api';

export type AuthStatus = 'loading' | 'signedOut' | 'signedIn';

export const SESSION_STORAGE_KEY = 'zpay.session.v1';

interface SessionState {
  hydrated: boolean;
  token: string | null;
  user: User | null;
  signIn: (session: AuthSession) => void;
  signOut: () => void;
  setUser: (user: User) => void;
  setHydrated: (value: boolean) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      hydrated: false,
      token: null,
      user: null,
      signIn: (session) =>
        set({ token: session.token, user: session.user, hydrated: true }),
      signOut: () => {
        // Clear any in-memory auth state first
        set({ token: null, user: null });
        // Fully remove persisted token/user so a relaunch stays logged out
        AsyncStorage.removeItem(SESSION_STORAGE_KEY).catch(() => {});
      },
      setUser: (user) => set({ user }),
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: SESSION_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
