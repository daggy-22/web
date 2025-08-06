/* eslint-disable */

"use client";

import React, { useState, useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useNationalIdDataStore from "@/stores/nationalIdDataStore";
import { initiateNationalId, verifyIdConsent } from "@/libs/api";
import toast from "react-hot-toast";

interface FormData {
  nationalID: string[];
  otp: string[];
}

const formTextContent: {
  [key: number]: { title: string; description: string };
} = {
  0: {
    title: "Verify Your National ID",
    description:
      "Enter your National ID to check financing eligibility and pre-fill your details.",
  },
  1: {
    title: "Verify OTP",
    description:
      "An OTP has been sent to your registered mobile or email. Enter it below to continue.",
  },
};

const InitiateComponent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const clearIdData = useNationalIdDataStore((state) => state.clearIdData);
  const setIdData = useNationalIdDataStore((state) => state.setIdData);
  const idData = useNationalIdDataStore((state) => state.idData);

  const registerManually = () => {
    clearIdData();
    router.push("/get-started");
  };

  const [formData, setFormData] = useState<FormData>({
    nationalID: Array(16).fill(""),
    otp: Array(6).fill(""),
  });

  const nationalIdRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);


  const validateNationalId = (): boolean => {
    return formData.nationalID.every((digit) => digit.match(/^\d$/));
  };

  const validateOtp = (): boolean => {
    return formData.otp.join("").length === 6;
  };

  const nationalIdString = formData.nationalID.join("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "nationalID" | "otp"
  ) => {
    const { value, dataset } = e.target;
    const index = dataset.index ? parseInt(dataset.index) : -1;
    if (index === -1) return;
    const digit = value.replace(/\D/g, "").slice(0, 1);

    if (type === "nationalID") {
      const newNationalID = [...formData.nationalID];
      newNationalID[index] = digit;
      setFormData((prev) => ({ ...prev, nationalID: newNationalID }));
      if (digit && index < 15) {
        nationalIdRefs.current[index + 1]?.focus();
      }

    } else {
      const newOtp = [...formData.otp];
      newOtp[index] = digit;
      setFormData((prev) => ({ ...prev, otp: newOtp }));
      if (digit && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    type: "nationalID" | "otp"
  ) => {
    const currentVal =
      type === "nationalID" ? formData.nationalID[index] : formData.otp[index];

    if (e.key === "Backspace") {
      if (currentVal) {
        if (type === "nationalID") {
          const newNationalID = [...formData.nationalID];
          newNationalID[index] = "";
          setFormData((prev) => ({ ...prev, nationalID: newNationalID }));
        } else {
          const newOtp = [...formData.otp];
          newOtp[index] = "";
          setFormData((prev) => ({ ...prev, otp: newOtp }));
        }
      } else if (index > 0) {
        if (type === "nationalID") {
          nationalIdRefs.current[index - 1]?.focus();
          const newNationalID = [...formData.nationalID];
          newNationalID[index - 1] = "";
          setFormData((prev) => ({ ...prev, nationalID: newNationalID }));
        } else {
          otpRefs.current[index - 1]?.focus();
          const newOtp = [...formData.otp];
          newOtp[index - 1] = "";
          setFormData((prev) => ({ ...prev, otp: newOtp }));
        }
      }
      e.preventDefault();
    }

    if (
      !(
        e.key === "Backspace" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Tab"
      ) &&
      !/\d/.test(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (loading) return;
    setLoading(true);

    if (currentStep === 0) {
      if (!validateNationalId()) {
        toast.error("National ID must be exactly 16 digits.");
        setLoading(false);
        return;
      }
      try {
        const res = await initiateNationalId({
          nationalID: nationalIdString,
        });
        if (res.transactionId) {
          setIdData({
            idNumber: nationalIdString,
            transactionId: res.transactionId,
          });
          setCurrentStep(1);
        } else {
          toast.error("Error initiating National ID. Please try again.");
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please register again.");
          router.push("/register");
        } else {
          toast.error("Error verifying OTP. Please try again.");
        }
      }
    } else if (currentStep === 1) {
      if (!validateOtp()) {
        toast.error("Please enter the 6-digit OTP.");
        setLoading(false);
        return;
      }

      try {
        const res = await verifyIdConsent({
          transactionID: idData?.transactionId,
          otp: formData.otp.join(""),
          nationalID: nationalIdString,
        });
        setIdData({ ...idData, ...res });
        router.push("/get-started");
      } catch (error) {
        toast.error("Error verifying OTP. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 py-12 rounded-2xl">
      <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {formTextContent[currentStep].title}
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            {formTextContent[currentStep].description}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {currentStep === 0 && (
            <div
              className="flex justify-center gap-2"
              aria-label="National ID input, 16 digits in 4 groups"
            >
              {[0, 4, 8, 12].map((groupStart) => (
                <div key={groupStart} className="flex gap-1">
                  {formData.nationalID
                    .slice(groupStart, groupStart + 4)
                    .map((digit, idx) => {
                      const globalIdx = groupStart + idx;
                      return (
                        <input
                          key={globalIdx}
                          ref={(el: HTMLInputElement | null) => {
                            nationalIdRefs.current[globalIdx] = el;
                          }}
                          data-index={globalIdx}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          pattern="\d"
                          value={digit}
                          onChange={(e) => handleInputChange(e, "nationalID")}
                          onKeyDown={(e) => handleKeyDown(e, globalIdx, "nationalID")}
                          className="w-5 h-5 rounded-md border border-gray-300 text-center md:text-md text-sm font-mono
                            focus:outline-none focus:ring-1 focus:ring-gray-300 transition-colors"
                          placeholder="x"
                          aria-label={`National ID digit ${globalIdx + 1}`}
                          autoComplete="off"
                        />
                      );
                    })}
                </div>
              ))}
            </div>
          )}

          {currentStep === 1 && (
            <div className="flex justify-center gap-2">
              {formData.otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el: HTMLInputElement | null) => {
                    otpRefs.current[index] = el;
                  }}

                  data-index={index}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  pattern="\d"
                  value={digit}
                  onChange={(e) => handleInputChange(e, "otp")}
                  onKeyDown={(e) => handleKeyDown(e, index, "otp")}
                  className="w-10 h-10 rounded-xl border border-gray-300 text-center text-xl font-mono
                   focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all placeholder:text-gray-300"
                  placeholder="•"
                  autoComplete="off"
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>
          )}


          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center text-center bg-gray-800 hover:bg-gray-900 border border-gray-800 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Continue →"}
          </button>

          <button
            onClick={registerManually}
            className="w-full flex items-center justify-center text-center border border-gray-700 text-gray-800 hover:bg-gray-800 hover:text-white py-2 rounded-lg font-semibold transition"
          >
            Register Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitiateComponent;
