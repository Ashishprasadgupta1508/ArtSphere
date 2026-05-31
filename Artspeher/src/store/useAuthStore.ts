import { create } from 'zustand';
import type { User } from 'firebase/auth';

interface AuthState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  clearUser: () => set({ currentUser: null }),
}));
