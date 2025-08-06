"use client";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { FiChevronLeft } from "react-icons/fi";
import { initiateResetPassword, validateResetPassword } from "@/libs/api";
import useTokenStore from "@/stores/tokenStore";
import useResetPhoneStore from "@/stores/resetPhoneStore";

const PasswordReset: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setTokenString] = useState("");

  const { setToken, setPhone } = useTokenStore((state) => state);
  const { setResetPhone } = useResetPhoneStore((state) => state);

  const validatePhoneNumber = (phone: string): boolean => {
    const regex = /^(09|07)\d{8}$/;
    return regex.test(phone);
  };

  const formatPhoneForApi = (phone: string): string => {
    return `251${phone.substring(1)}`;
  };

  const initiateMutation = useMutation({
    mutationFn: (phone: string) =>
      initiateResetPassword({ phoneNumber: formatPhoneForApi(phone) }),
    onSuccess: () => {
      toast.success("OTP sent successfully");
      setStep(2);
    },
    onError: (error: any) => {
      const errorCode = error?.response?.data?.code;
      if (errorCode === "asset_finance.resource.customer_not_found") {
        toast.error("User not found");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    },
  });

  const validateMutation = useMutation({
    mutationFn: (token: string) =>
      validateResetPassword({
        phoneNumber: formatPhoneForApi(phoneNumber),
        token,
      }),
    onSuccess: (res: any) => {
      toast.success("Phone number verified successfully");
      setToken(res.token?.access_token);
      setPhone(phoneNumber);
      setResetPhone(formatPhoneForApi(phoneNumber));
      router.push("/auth/set-password?showStepper=false&reset=true");
    },
    onError: () => {
      toast.error("Invalid OTP. Please try again.");
    },
  });

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error(
        "Please enter a valid phone number (09 or 07 followed by 8 digits)"
      );
      return;
    }
    initiateMutation.mutate(phoneNumber);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please enter the OTP");
      return;
    }
    validateMutation.mutate(token);
  };

  const goBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep(1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-start items-center">
          <button
            onClick={goBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Go back"
          >
            <FiChevronLeft className="w-5 h-5 mr-1" />
            <span>Back</span>
          </button>
        </div>

        {step === 1 ? (
          <>
            <div className="text-2xl font-bold py-5 text-center">
              Verify Your Phone Number
            </div>
            <div className="text-gray-600 text-center mb-6">
              Enter your phone number to receive a verification OTP
            </div>

            <form
              onSubmit={handleStep1Submit}
              className="flex flex-col gap-4 bg-white p-5 rounded-lg shadow-md w-full"
            >
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border rounded-xl px-4 h-12 focus:outline-none w-full"
                placeholder="09XXXXXXXX or 07XXXXXXXX"
                pattern="(09|07)\d{8}"
                required
              />
              <div className="text-sm text-gray-500">
                Format: 09 or 07 followed by 8 digits
              </div>

              <button
                type="submit"
                disabled={initiateMutation.isPending}
                className="btn bg-primary hover:opacity-50 border-none text-white w-full flex justify-center items-center"
              >
                {initiateMutation.isPending ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "Send OTP →"
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="text-2xl font-bold py-5 text-center">
              Verify OTP
            </div>
            <div className="text-gray-600 text-center mb-6">
              Enter the OTP sent to {phoneNumber}
            </div>

            <form
              onSubmit={handleStep2Submit}
              className="flex flex-col gap-4 bg-white p-5 rounded-lg shadow-md w-full"
            >
              <input
                type="text"
                value={token}
                onChange={(e) => setTokenString(e.target.value)}
                className="border rounded-xl px-4 h-12 focus:outline-none w-full"
                placeholder="OTP Code"
                required
              />

              <button
                type="submit"
                disabled={validateMutation.isPending}
                className="btn bg-primary hover:opacity-50 border-none text-white w-full flex justify-center items-center"
              >
                {validateMutation.isPending ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "Verify OTP →"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
