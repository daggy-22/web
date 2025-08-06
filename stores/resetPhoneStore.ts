import { create } from "zustand";

interface ResetPhoneStore {
  resetPhone: string;
  setResetPhone: (phone: string) => void;
  clearResetPhone: () => void;
}

const useResetPhoneStore = create<ResetPhoneStore>((set) => ({
  resetPhone: "",
  setResetPhone: (phone: string) => set({ resetPhone: phone }),
  clearResetPhone: () => set({ resetPhone: "" }),
}));

export default useResetPhoneStore;
