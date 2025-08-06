"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CustomerState = {
  id: string | null;
  setCustomerId: (id: string) => void;
  clearCustomerId: () => void;
};

const useCustomerIdStore = create(
  persist<CustomerState>(
    (set) => ({
      id: null,
      setCustomerId: (id) => set({ id }),
      clearCustomerId: () => set({ id: null }),
    }),
    {
      name: "customer_id_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCustomerIdStore;
