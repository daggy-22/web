import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface PaymentPlan {
  productId?: string;
  planId: string;
  name: string;
  paymentFrequency: string;
  numberOfInstallments: number;
  totalCost: number;
  repaymentAmount: number;
  serviceFee: number;
  interestRate: number;
  paymentStartDate: string | null;
  expiryDate: string | null;
  totalInterest: number;
  totalFees: number;
  principalAmount: number;
  productDescription: string;
  selected?: boolean;
}

interface PaymentPlanState {
  plans: PaymentPlan[];
  selectedPlan: PaymentPlan | null;
  setPlans: (plans: PaymentPlan[]) => void;
  selectPlan: (productId: string) => void;
  clearSelection: () => void;
  clearAll: () => void;
}

const usePaymentPlansStore = create<PaymentPlanState>()(
  persist(
    (set) => ({
      plans: [],
      selectedPlan: null,
      setPlans: (plans) => set({ plans }),
      selectPlan: (productId) =>
        set((state) => {
          const updatedPlans = state.plans.map((plan) => ({
            ...plan,
            selected: plan.planId === productId,
          }));
          return {
            plans: updatedPlans,
            selectedPlan: updatedPlans.find((plan) => plan.selected) || null,
          };
        }),
      clearSelection: () =>
        set((state) => ({
          plans: state.plans.map((plan) => ({ ...plan, selected: false })),
          selectedPlan: null,
        })),
      clearAll: () => set({ plans: [], selectedPlan: null }),
    }),
    {
      name: "payment-plans-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePaymentPlansStore;
