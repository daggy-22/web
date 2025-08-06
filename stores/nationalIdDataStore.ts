"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type NationalIdData = {
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  phoneNumber?: string;
  emailId?: string;
  fullAddress?: string;
  photo?: string;
  idNumber?: string
  transactionId?: string
};

interface IdState {
  idData: NationalIdData | null;
  setIdData: (item: NationalIdData) => void;
  clearIdData: () => void;
}

const useNationalIdDataStore = create(
  persist<IdState>(
    (set) => ({
      idData: null,
      setIdData: (item) => set({ idData: item }),
      clearIdData: () => set({ idData: null }),
    }),
    {
      name: "national-id-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useNationalIdDataStore;
