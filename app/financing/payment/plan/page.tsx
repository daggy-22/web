"use client";

import { useEffect, useState } from "react";
import PaymentPlansList from "@/components/order/PaymentPlans";
import usePaymentPlansStore from "@/stores/paymentPlansStore";
import { useRouter } from "next/navigation";
import { acceptPaymentPlan } from "@/libs/api";
import toast from "react-hot-toast";
import useSelectedDeviceStore from "@/stores/selectedDeviceStore";
import { FaSpinner } from "react-icons/fa";
import { FiChevronLeft, FiMapPin, FiPhone } from "react-icons/fi";
import DeviceCard from "@/components/device/DeviceCard";

const PaymentPlansPage = () => {
  const router = useRouter();
  const { plans, selectedPlan, selectPlan } = usePaymentPlansStore();
  const device = useSelectedDeviceStore((state) => state.device);
  const orderId = device?.orderId || "";

  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingPlans, setIsLoadingPlans] = useState(plans.length === 0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (plans.length === 0) {
        const timer = setTimeout(() => {
          setIsLoadingPlans(false);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [plans]);

  const handlePlanProcessing = async (paymentPlanId: string) => {
    if (!orderId) {
      toast.error("Missing order information");
      return;
    }

    setIsProcessing(true);
    try {
      await acceptPaymentPlan(orderId, { paymentPlanId });
      toast.success("Order processed successfully");
      setReady(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to process order");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlanSelect = (productId: string) => {
    if (!isProcessing && !isLoadingPlans) {
      selectPlan(productId);
    }
  };

  const handleProceed = () => {
    if (selectedPlan && !isProcessing && !isLoadingPlans) {
      handlePlanProcessing(selectedPlan.planId);
    }
  };

  const handleBack = () => router.back();

  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-xl font-bold">No device selected</h2>
        <p className="text-gray-600 mt-2">
          Please go back and select a device first
        </p>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (ready) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen text-center px-4">
        <img className="w-56 h-44" src="/complete.gif" alt="check" />
        <h2 className="text-2xl font-bold">You&apos;re ready to purchase!</h2>
        <p className="md:text-md text-sm text-gray-600 max-w-md">
          Please proceed and get the merchant to complete the transaction.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-600">
          {device?.merchantPhone && (
            <p className="text-md flex gap-2 items-center">
              <FiPhone className="w-5 h-5" />
              <a href={`tel:${device.merchantPhone}`}>{device.merchantPhone}</a>
            </p>
          )}
          <p className="text-md flex gap-2 items-center">
            <FiMapPin className="w-5 h-5" />
            Bole Atlas
          </p>
        </div>
        <DeviceCard device={device} showFinancingBtn={false} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-64px)] md:flex md:flex-col md:justify-center">
      <div className="md:max-w-4xl md:mx-auto md:w-full">
        <div className="flex items-center justify-between mb-6 relative">
          <div className="md:h-14 h-6 cursor-pointer" onClick={handleBack}>
            <FiChevronLeft className="md:w-10 w-4 md:h-10 h-4 text-gray-700" />
          </div>
          <h1 className="md:text-2xl text-md font-bold mx-auto text-gray-800">
            Select Payment Plan
          </h1>
          <button
            onClick={handleProceed}
            disabled={!selectedPlan || isProcessing || isLoadingPlans}
            className={`md:px-6 px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
              selectedPlan && !isLoadingPlans
                ? "bg-gray-800 hover:bg-gray-900 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            } ${isLoadingPlans ? "animate-pulse" : ""}`}
          >
            {isProcessing ? (
              <>
                <FaSpinner className="animate-spin h-4 w-4 text-white" />
                <span className="md:text-sm text-xs">Processing...</span>
              </>
            ) : (
              <span className="md:text-sm text-xs">
                {selectedPlan ? "Proceed" : "Select a plan"}
              </span>
            )}
          </button>
        </div>

        <div className="flex justify-center items-center">
          {isLoadingPlans ? (
            <div className="w-full flex md:flex-row flex-col gap-4 overflow-x-auto py-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 md:w-72 w-full h-[300px] bg-gray-100 rounded-lg animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    minWidth: "16rem",
                  }}
                />
              ))}
            </div>
          ) : (
            <PaymentPlansList
              plans={plans}
              selectedPlanId={selectedPlan?.planId || null}
              onSelect={handlePlanSelect}
            />
          )}
        </div>

        {!isLoadingPlans && plans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No payment plans available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPlansPage;
