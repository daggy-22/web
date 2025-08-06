"use client";

import {
  FaCheckCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaPercentage,
  FaWallet,
  FaShieldAlt,
} from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney, GiCash } from "react-icons/gi";
import { RiVipCrownFill } from "react-icons/ri";

interface PaymentPlan {
  planId?: string;
  productId?: string;
  name?: string;
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
  isPremium?: boolean;
  monthlyPayment?: number;
  totalPayment?: number;
  dailyPayment?: number;
}

interface PaymentPlansListProps {
  plans: PaymentPlan[];
  selectedPlanId: string | null;
  onSelect: (productId: string) => void;
}

const PaymentPlansList = ({
  plans,
  selectedPlanId,
  onSelect,
}: PaymentPlansListProps) => {
  console.log({ plans });
  return (
    <div className="relative p-4 max-w-[90vw] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.planId}
            className={`relative rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              selectedPlanId === plan.planId
                ? "bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-400 shadow-xl"
                : "bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-md"
            } ${plan.isPremium ? "ring-2 ring-yellow-400" : ""}`}
            onClick={() => onSelect(plan?.planId as string)}
          >
            {/* Premium badge */}
            {plan.isPremium && (
              <div className="absolute -top-3 -left-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold text-xs flex items-center">
                <RiVipCrownFill className="mr-1" /> PREMIUM
              </div>
            )}

            {/* Selection indicator */}
            {selectedPlanId === plan.planId && (
              <div className="absolute -top-3 -right-3 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                <FaCheckCircle className="text-xl" />
              </div>
            )}

            {/* Plan header */}
            <div className="flex items-start mb-4">
              <div
                className={`p-3 rounded-lg mr-4 ${
                  selectedPlanId === plan.planId
                    ? "bg-gray-700 text-blue-300"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {plan.isPremium ? (
                  <GiCash className="text-2xl" />
                ) : (
                  <FaWallet className="text-2xl" />
                )}
              </div>
              <div>
                <h3
                  className={`text-xl font-bold ${
                    selectedPlanId === plan.planId
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100"
                      : "text-gray-800"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    selectedPlanId === plan.planId
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  {plan.productDescription}
                </p>
              </div>
            </div>

            {/* Plan details */}
            <div
              className={`space-y-4 text-sm ${
                selectedPlanId === plan.planId
                  ? "text-gray-200"
                  : "text-gray-700"
              }`}
            >
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-400" />
                  <span>Frequency</span>
                </div>
                <span className="font-medium">Monthly</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <div className="flex items-center">
                  <GiPayMoney className="mr-2 text-green-400" />
                  <span>Installments</span>
                </div>
                <span className="font-medium">{plan.numberOfInstallments}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <div className="flex items-center">
                  <FaMoneyBillWave className="mr-2 text-purple-400" />
                  <span>Total Cost</span>
                </div>
                <span className="font-semibold">
                  ETB {Math.abs(plan?.totalPayment || 0)?.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <div className="flex items-center">
                  <GiReceiveMoney className="mr-2 text-yellow-400" />
                  <span>Monthly Payment</span>
                </div>
                <span className="font-semibold">
                  ETB {plan?.monthlyPayment?.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <div className="flex items-center">
                  <FaPercentage className="mr-2 text-red-400" />
                  <span>Interest Rate</span>
                </div>
                <span
                  className={`font-semibold ${
                    selectedPlanId === plan.planId
                      ? "text-blue-300"
                      : "text-blue-600"
                  }`}
                >
                  {plan.interestRate}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaShieldAlt className="mr-2 text-emerald-400" />
                  <span>Daily Payment</span>
                </div>
                <span className="font-medium">
                  ETB {plan?.dailyPayment?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Subtle glow effect for selected card */}
            {selectedPlanId === plan.planId && (
              <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-blue-400/30" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPlansList;
