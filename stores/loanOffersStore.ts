"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface LoanOffer {
  customerId: string;
  maximumCreditLimit: number;
  minimumCreditLimit: number;
  outstandingLoan: number;
  availableCreditLimit: number;
  totalOverdueAmount: number;
  status: string;
  reasonCode: string;
  profileMode: string;
}

type LoanOfferState = {
  loan: LoanOffer | null;
  setLoan: (loan: LoanOffer) => void;
  clearLoan: () => void;
};

const useLoanOffersStore = create(
  persist<LoanOfferState>(
    (set) => ({
      loan: null,
      setLoan: (loan) => set({ loan }),
      clearLoan: () => set({ loan: null }),
    }),
    {
      name: "loan_offer_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLoanOffersStore;
