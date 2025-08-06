"use client";

import StepIndicator from "@/components/form/StepIndicator";
import SplitLayout from "@/components/ui/SplitLayout";
import useSelectedDeviceStore from "@/stores/selectedDeviceStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLoanOffers } from "@/libs/api";
import { useMutation } from "@tanstack/react-query";
import { getImageUrl } from "@/utils/helper";
import NotEligible from "@/components/common/utility/Unable";
import useLoanOffersStore from "@/stores/loanOffersStore";
import ProcessingLoan from "@/components/loan/Processing";
import useCustomerStore from "@/stores/customerStore";

const SuccessView = () => {
  const headerClass = "md:text-2xl text-lg font-[700] leading-5";
  const subHeaderClass = "md:text-lg text-sm font-[400] leading-5";

  const router = useRouter();
  const device = useSelectedDeviceStore((state) => state.device);
  const loan = useLoanOffersStore((state) => state.loan);
  const maxLoan = loan?.availableCreditLimit || 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const onProceed = () => router.push("/financing/merchant/search");

  if (!device) {
    return (
      <div className="bg-[#F9FAFB] flex flex-col md:gap-8 gap-6 justify-center items-center text-left md:p-10 p-5 w-full">
        <div className="w-full md:p-8 p-4 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <StepIndicator currentStep={1} totalSteps={2} />
            <div className="flex flex-col justify-center items-center gap-2 mt-4">
              <h1 className={headerClass}>No Device Selected</h1>
              <p className="text-gray-600 text-center">
                Please select a device to proceed with financing options
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-600">
              You haven&apos;t selected any device yet. Browse our catalog to
              find a device that suits your needs.
            </p>
          </div>
        </div>

        <div className="flex w-full">
          <button
            onClick={() => window.location.href = "/products"}
            className="flex-1 py-3 px-6 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Browse Devices
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] flex flex-col md:gap-10 gap-0 justify-center items-center text-left md:p-20 p-10 w-full">
      <div className="w-full md:p-10 p-5 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-3">
          <StepIndicator currentStep={1} totalSteps={2} />
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className={headerClass}>
              Congratulations! You&apos;re Eligible
            </h1>
            <h1 className={subHeaderClass}>
              Please provide your details to proceed with financing
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full flex-grow flex flex-col justify-center items-center md:gap-10 gap-0 p-6">
        {device ? (
          <div className="w-full flex-grow bg-white flex flex-col justify-center items-center md:gap-10 gap-0 p-6">
            <div className="flex">
              <img
                className="w-[150px] h-[150px]"
                src={getImageUrl(device?.id as string)}
                alt="Phone"
              />
              <div className="flex flex-col justify-start items-start md:gap-2 gap-1 md:p-5 p-3 rounded-xl w-full">
                <h1 className="md:text-2xl text-lg font-[700] leading-5">
                  {device.deviceName}
                </h1>
                <div className="flex gap-2">
                  <p className="md:text-xl text-md font-[700] leading-5">
                    Price:
                  </p>
                  <p className="md:text-xl text-md font-[300] leading-5">
                    {formatCurrency(Number(device.maximumPrice || 0))}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="md:text-xl text-md font-[700] leading-5">
                    Your Limit:
                  </p>
                  <p className="md:text-xl text-md font-[300] leading-5">
                    {formatCurrency(maxLoan)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex-grow bg-white flex flex-col justify-center items-center md:gap-10 gap-0 p-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="md:text-2xl text-lg font-[700] leading-5 text-center">
                No device selected
              </h1>
              <p className="md:text-lg text-md font-[400] leading-5 text-center text-gray-600">
                You can proceed to browse available devices within your
                financing limit
              </p>
            </div>
          </div>
        )}

        <div className="flex bg-white flex-col justify-center items-center md:gap-6 gap-2 md:p-10 p-5 rounded-xl w-full">
          <h1 className="text-lg font-[700] leading-5">Your Financing Limit</h1>
          <h1 className="md:text-5xl text-2xl font-bold leading-5">
            {formatCurrency(maxLoan)}
          </h1>
          <h1 className="md:text-lg text-sm font-normal leading-5 text-gray-600">
            {device
              ? "Choose a Device Within Your Limit or proceed to view all devices."
              : "Browse devices within your financing limit or view all available options."}
          </h1>
        </div>
        <div className="flex md:flex-row bg-white flex-col gap-4 justify-between items-center w-full md:p-6 p-3 rounded-xl">
          <Link href="/products?withinLimit=true">
            <button className="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-md w-full md:w-auto">
              <span className="text-nowrap">View Devices Within My Limit</span>
            </button>
          </Link>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md w-full md:w-auto disabled:opacity-50"
            onClick={onProceed}
          >
            <span className="text-nowrap">
              {device ? "Proceed with selected device" : "Browse All Devices"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const FailedView = () => {
  const headerClass = "md:text-2xl text-lg font-[700] leading-5";
  const router = useRouter();
  const device = useSelectedDeviceStore((state) => state.device);
  const setDevice = useSelectedDeviceStore((state) => state.setDevice);
  const loan = useLoanOffersStore((state) => state.loan);
  const maxLoan = loan?.availableCreditLimit || 0;

  const totalPrice = device?.maximumPrice ?? 0;
  const minDownPayment = Math.ceil(totalPrice * 0.3);
  const [downPayment, setDownPayment] = useState<number>(minDownPayment);
  const [isValid, setIsValid] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setDownPayment(value);
    setIsValid(value >= minDownPayment && value <= totalPrice);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDownPayment(value);
    setIsValid(true);
  };

  const handleConfirm = () => {
    if (isValid && device) {
      setDevice({
        ...device,
        downPayment,
        financingLimit: maxLoan,
      });
      router.push("/financing/merchant/search");
    }
  };

  if (loan?.status === "NOT_ELIGIBLE") {
    return <NotEligible reason={loan.reasonCode || "UNKNOWN"} />;
  }

  if (!device) {
    return (
      <div className="bg-[#F9FAFB] flex flex-col md:gap-8 gap-6 justify-center items-center text-left md:p-10 p-5 w-full">
        <div className="w-full md:p-8 p-4 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <StepIndicator currentStep={1} totalSteps={2} />
            <div className="flex flex-col justify-center items-center gap-2 mt-4">
              <h1 className={headerClass}>No Device Selected</h1>
              <p className="text-gray-600 text-center">
                Please select a device to proceed with financing options
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-600">
              You haven&apos;t selected any device yet. Browse our catalog to
              find a device that suits your needs.
            </p>
          </div>
        </div>

        <div className="flex w-full">
          <button
            onClick={() => window.location.href = "/products"}
            className="flex-1 py-3 px-6 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Browse Devices
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] flex flex-col md:gap-8 gap-6 justify-center items-center text-left md:p-10 p-5 w-full">
      <div className="w-full md:p-8 p-4 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <StepIndicator currentStep={1} totalSteps={2} />
          <div className="flex flex-col justify-center items-center gap-2 mt-4">
            <h1 className={headerClass}>
              Your Selected Device Exceeds Your Financing Limit
            </h1>
            <p className="text-gray-600 text-center">
              Please make a down payment to cover the difference
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            className="w-32 h-32 object-contain self-center"
            src={getImageUrl(device?.id as string)}
            alt="Phone"
          />
          <div className="flex-1 flex flex-col gap-3">
            <h1 className="text-xl font-bold">{device.deviceName}</h1>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Device Price</p>
                <p className="font-medium">{formatCurrency(totalPrice)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Your Limit</p>
                <p className="font-medium">{formatCurrency(maxLoan)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount Over Limit</p>
                <p className="font-medium text-red-500">
                  {totalPrice > maxLoan
                    ? formatCurrency(totalPrice - maxLoan)
                    : "0 ETB"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Minimum Down Payment (30%)
                </p>
                <p className="font-medium">{formatCurrency(minDownPayment)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-bold">Payment Breakdown</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Enter Down Payment</p>
              <p className="text-sm text-gray-500">
                Minimum: {formatCurrency(minDownPayment)} • Maximum:{" "}
                {formatCurrency(totalPrice)}
              </p>
            </div>
            <div className="relative w-48">
              <input
                type="number"
                min={minDownPayment}
                max={totalPrice}
                value={downPayment}
                onChange={handleDownPaymentChange}
                className={`w-full p-2 border rounded-md text-right font-medium ${!isValid ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {!isValid && (
                <p className="absolute -bottom-5 right-0 text-xs text-red-500">
                  Must be between {formatCurrency(minDownPayment)} and{" "}
                  {formatCurrency(totalPrice)}
                </p>
              )}
            </div>
          </div>

          <div className="py-2">
            <input
              type="range"
              min={minDownPayment}
              max={totalPrice}
              value={downPayment}
              onChange={handleSliderChange}
              step="100"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatCurrency(minDownPayment)}</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Your Down Payment</p>
            <p className="text-xl font-bold text-blue-600">
              {formatCurrency(downPayment)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Amount to Finance</p>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(Math.max(0, totalPrice - downPayment))}
            </p>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-between border-t border-gray-200 pt-4">
            <p className="font-medium">Total Device Price</p>
            <p className="font-bold">{formatCurrency(totalPrice)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <button
          onClick={() => window.location.href = "/products"}
          className="flex-1 py-3 px-6 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Device Selection
        </button>
        <button
          onClick={handleConfirm}
          disabled={!isValid}
          className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-colors ${isValid
              ? "bg-gray-800 hover:bg-gray-900"
              : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Confirm and Continue
        </button>
      </div>
    </div>
  );
};

const FinancingPage = () => {
  const customer = useCustomerStore((state) => state.customer);
  const { setLoan, loan } = useLoanOffersStore((state) => state);
  const device = useSelectedDeviceStore((state) => state.device);
  const [financingStatus, setFinancingStatus] = useState<
    "success" | "failed" | "not_eligible" | "pending"
  >("pending");
  const router = useRouter();

  const headerClass = "md:text-2xl text-lg font-[700] leading-5";

  const { mutate: createLoanMutation, isPending } = useMutation({
    mutationFn: () => getLoanOffers(customer?.id as string),
    onSuccess: (data) => {
      if (data) {
        setLoan(data);

        if (data.status === "NOT_ELIGIBLE") {
          setFinancingStatus("not_eligible");
          return;
        }

        const hasSufficientCredit = device?.maximumPrice
          ? (data.availableCreditLimit || 0) >= device.maximumPrice
          : false;

        setFinancingStatus(hasSufficientCredit ? "success" : "failed");
      } else {
        setFinancingStatus("failed");
      }
    },
    onError: (e) => {
      console.error("Error fetching loan offers:", e);
      setFinancingStatus("failed");
    },
  });

  useEffect(() => {
    if (customer?.id) {
      createLoanMutation();
    }
  }, [customer, device?.id, createLoanMutation, router]);

  if (isPending || financingStatus === "pending") {
    return (
      <SplitLayout
        rightMain={<ProcessingLoan />}
        showHeader={false}
        showHero={false}
        showFooter={false}
      />
    );
  }

  if (!device) {
    return (
      <div className="bg-[#F9FAFB] flex flex-col md:gap-8 gap-6 justify-center items-center text-left md:p-10 p-5 w-full">
        <div className="w-full md:p-8 p-4 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <StepIndicator currentStep={1} totalSteps={2} />
            <div className="flex flex-col justify-center items-center gap-2 mt-4">
              <h1 className={headerClass}>No Device Selected</h1>
              <p className="text-gray-600 text-center">
                Please select a device to proceed with financing options
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/no-device.avif"
              alt="No device selected"
              className="w-32 h-32"
            />
            <p className="text-gray-600">
              You haven&apos;t selected any device yet. Browse our catalog to
              find a device that suits your needs.
            </p>
          </div>
        </div>

        <div className="flex w-full">
          <button
            onClick={() => window.location.href = "/products"}
            className="flex-1 py-3 px-6 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Browse Devices
          </button>
        </div>
      </div>
    );
  }

  return (
    <SplitLayout
      rightMain={
        <div className="flex flex-col h-full w-full min-w-[300px]">
          {financingStatus === "success" ? (
            <SuccessView />
          ) : financingStatus === "not_eligible" ? (
            <NotEligible
              reason={loan?.reasonCode || "UNKNOWN"}
              onRefresh={() => {
                setFinancingStatus("pending");
                createLoanMutation();
              }}
            />
          ) : (
            <FailedView />
          )}
        </div>
      }
      showHero={false}
      showHeader={false}
      showFooter={false}
    />
  );
};

export default FinancingPage;
