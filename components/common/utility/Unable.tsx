"use client";

import React, { useEffect } from "react";
import { FiXCircle } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";

interface Props {
  reason?: string;
  onRefresh?: () => void;
}

const REASON_MESSAGES = {
  UNKNOWN: "We're unable to determine your eligibility at the moment.",
  HAS_OPEN_LOAN:
    "It looks like you have an active loan. Please repay it before applying again.",
  HAS_LOAN_BEING_PROCESSED:
    "You already have a loan application in progress. Please wait for it to complete.",
  HAS_ZERO_OR_NO_CREDIT_LIMIT:
    "You currently don’t have an available credit limit to borrow.",
  CAN_BORROW:
    "You may be eligible to borrow, but some conditions are preventing approval.",
  MAXIMUM_NUMBER_OF_LOANS_REACHED:
    "You’ve reached the maximum number of loans allowed.",
  HAS_OVERDUE_LOAN:
    "You have an overdue loan. Please clear it before applying again.",
  HAS_WRITTEN_OFF_LOAN:
    "You have a written-off loan. Contact customer support for help.",
  HAS_NOT_BEEN_PROFILED:
    "We need more details to check your eligibility. Please complete your profile.",
  HAS_LOAN_WITH_OTHER_PARTNERS:
    "You currently have a loan with another financial partner.",
};

export default function NotEligible({ reason, onRefresh }: Props) {
  const message =
    reason && REASON_MESSAGES[reason as keyof typeof REASON_MESSAGES]
      ? REASON_MESSAGES[reason as keyof typeof REASON_MESSAGES]
      : "Unfortunately, you're not eligible for a loan at the moment. Please try again later.";

  useEffect(() => {
    // Disable scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scroll on unmount
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f9fafb] p-4">
      <div className="bg-white rounded-3xl w-[400px] px-8 py-10 text-center relative overflow-hidden shadow-2xl">
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
          <FiXCircle className="w-12 h-12 text-red-500" />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
          You&apos;re Not Eligible
        </h1>

        <p className="text-gray-600 text-md mb-8 leading-relaxed">{message}</p>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onRefresh}
            className="w-full border border-primary text-primary py-2.5 px-6 rounded-full font-semibold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <BiRefresh className="w-5 h-5" />
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-primary text-white py-3 px-6 rounded-full font-semibold hover:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            <FaHome className="w-5 h-5" />
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
