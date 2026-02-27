import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean; 
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: true, 

  setUser: (user: User) => set({ 
    user, 
    isAuthenticated: true, 
    isAuthLoading: false 
  }),

  clearIsAuthenticated: () => set({ 
    user: null, 
    isAuthenticated: false, 
    isAuthLoading: false 
  }),
}));