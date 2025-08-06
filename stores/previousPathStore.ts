"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type PathState = {
  path: string | null;
  setPath: (id: string) => void;
  clearPath: () => void;
};

const usePreviousPathStore = create(
  persist<PathState>(
    (set) => ({
      path: null,
      setPath: (path) => set({ path }),
      clearPath: () => set({ path: null }),
    }),
    {
      name: "previous_path_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePreviousPathStore;
