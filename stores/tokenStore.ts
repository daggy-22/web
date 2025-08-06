"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TokenState = {
  token: string | null;
  phone: string | null;
  setToken: (token: string) => void;
  setPhone: (phone: string | null) => void;
  clearToken: () => void;
  clearPhone: () => void;
};

const useTokenStore = create(
  persist<TokenState>(
    (set) => ({
      token: null,
      phone: null,
      setToken: (token) => set({ token }),
      setPhone: (phone) => set({ phone }),
      clearToken: () => set({ token: null }),
      clearPhone: () => set({ phone: null }),
    }),
    {
      name: "auth_token_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTokenStore;
