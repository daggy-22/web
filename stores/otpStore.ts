"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface OtpState {
  id: string | null;
  setOtpId: (item: string) => void;
  clearOtpId: () => void;
}

const useOtpDataStore = create(
  persist<OtpState>(
    (set) => ({
      id: null,
      setOtpId: (item) => set({ id: item }),
      clearOtpId: () => set({ id: null }),
    }),
    {
      name: "otp-id-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOtpDataStore;
