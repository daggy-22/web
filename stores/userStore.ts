"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserItem = {
  id: string;
  name: string;
  token: string;
  refreshToken: string;
  tokenExpiry: number;
  refreshTokenExpiry: number;
};

interface UserState {
  user: UserItem | null;
  setUser: (item: UserItem) => void;
  clearUser: () => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (item) => set({ user: item }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
