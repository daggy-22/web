import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DeviceState {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

const useSelectedThemeStore = create<DeviceState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (item) => set({ theme: item }),
    }),
    {
      name: "selected-themee-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSelectedThemeStore;
