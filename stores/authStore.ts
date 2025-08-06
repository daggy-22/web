import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "@auth-storage",
      storage: {
        getItem: (name) => localStorage.getItem(name) as any,
        setItem: (name, value) =>
          localStorage.setItem(name, value as any) as any,
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
