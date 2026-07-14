import { create } from "zustand";

type AuthSessionState = {
  isAuthenticated: boolean | null;
  setAuthenticated: (isAuthenticated: boolean) => void;
};

export const useAuthSessionStore = create<AuthSessionState>((set) => ({
  isAuthenticated: null,
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
