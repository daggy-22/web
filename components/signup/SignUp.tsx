"use client";

import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { initiateOnboarding, verifyOnboarding } from "@/libs/api";
import { FiChevronLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import useCustomerIdStore from "@/stores/customerIdStore";
import useTokenStore from "@/stores/tokenStore";
import useOtpDataStore from "@/stores/otpStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SignUpProps {
  currentStep?: number;
  onStepChange: (step: number) => void;
}

const phoneSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^(9|7)\d{8}$/,
      "Phone number must start with 9 or 7 followed by 8 digits"
    )
    .required("Phone number is required"),
  acceptTerms: Yup.boolean()
    .oneOf([true], "You must accept the Terms & Conditions to continue")
    .required("You must accept the Terms & Conditions to continue"),
});

const otpSchema = Yup.object().shape({
  otp: Yup.string().required("OTP is required"),
});

const PhoneComponentContent: React.FC<SignUpProps> = ({ onStepChange }) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tokenSet, setTokenSet] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();
  const { setOtpId } = useOtpDataStore((state) => state);
  const setCustomerId = useCustomerIdStore((state) => state.setCustomerId);
  const setToken = useTokenStore((state) => state.setToken);
  const setPhone = useTokenStore((state) => state.setPhone);

  useEffect(() => {
    onStepChange(step === "phone" ? 1 : 2);
  }, [step, onStepChange]);

  useEffect(() => {
    if (tokenSet) router.push("/auth/set-password");
  }, [tokenSet]);

  return (
    <div className="flex flex-col items-center justify-center">
      {step === "phone" ? (
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold">Phone Number</h2>
          <p className="text-sm text-gray-600">
            Enter your phone number to get started.
          </p>

          <Formik
            initialValues={{ phoneNumber: "", acceptTerms: false }}
            validationSchema={phoneSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const formatted = `251${values.phoneNumber}`;
                setPhoneNumber(formatted);
                const res = await initiateOnboarding({
                  phoneNumber: formatted,
                });
                setCustomerId(res?.customerId);
                setOtpId(res?.data?.otp?.otpId || "");
                setStep("otp");
              } catch (error) {
                console.error(error);
                toast.error("Unable to send OTP. Please try again.");
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-4">
                <Field name="phoneNumber">
                  {({ field, form }: FieldProps) => (
                    <div className="flex items-center border rounded-2xl h-14 overflow-hidden">
                      <span className="px-4 h-14 flex items-center justify-center bg-gray-100 text-sm font-semibold text-gray-700">
                        +251
                      </span>
                      <input
                        {...field}
                        type="text"
                        placeholder="912345678"
                        maxLength={9}
                        className="flex-1 px-4 py-2 text-sm border-l outline-none"
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "");
                          if (value.startsWith("0")) value = value.substring(1);
                          form.setFieldValue("phoneNumber", value);
                        }}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="phoneNumber"
                  component="span"
                  className="text-xs text-red-500"
                />

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={values.acceptTerms}
                    onChange={(e) =>
                      setFieldValue("acceptTerms", e.target.checked)
                    }
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    required
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline font-medium"
                      target="_blank"
                    >
                      Terms & Conditions
                    </Link>
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                <ErrorMessage
                  name="acceptTerms"
                  component="span"
                  className="text-xs text-red-500"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-primary text-white w-full border-none hover:opacity-90 transition"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </span>
                  ) : (
                    "Send OTP →"
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-xs text-center text-gray-600">
            Already registered?{" "}
            <Link
              href="/login"
              className="underline font-medium hover:text-primary"
            >
              Login
            </Link>
          </p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
          <button
            onClick={() => setStep("phone")}
            className="self-start p-2 text-gray-600 hover:text-gray-900 transition"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-center">Enter OTP</h2>
          <p className="text-sm text-center text-gray-600">
            We sent a 4-digit code to your phone. Enter it below.
          </p>

          <Formik
            initialValues={{ otp: "" }}
            validationSchema={otpSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const res = await verifyOnboarding({
                  phoneNumber,
                  token: values.otp,
                });

                if (res?.token) {
                  toast.success("Phone Number verified successfully");
                  setToken(res.token?.access_token);
                  setPhone(phoneNumber);
                  setTokenSet(true);
                  return;
                }
                toast.error("Unable to verify. Please try again.");
              } catch (error) {
                console.error(error);
                toast.error("Unable to verify.");
              }
              setSubmitting(false);
            }}
          >
            {({ values, handleChange, submitForm, isSubmitting }) => (
              <Form className="space-y-4">
                <div className="flex justify-center gap-2">
                  {[...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      placeholder="-"
                      className="w-12 h-12 text-center text-xl border rounded border-gray-300 focus:ring-1 focus:ring-primary focus:outline-none"
                      value={values.otp[index] || ""}
                      ref={(el: HTMLInputElement | null) => {
                        otpInputRefs.current[index] = el;
                      }}
                      onChange={(e) => {
                        const newOtp = values.otp.split("");
                        newOtp[index] = e.target.value;
                        handleChange({
                          target: { name: "otp", value: newOtp.join("") },
                        });
                        if (e.target.value && index < 3) {
                          otpInputRefs.current[index + 1]?.focus();
                        }
                        if (newOtp.join("").length === 4) submitForm();
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          !values.otp[index] &&
                          index > 0
                        ) {
                          otpInputRefs.current[index - 1]?.focus();
                        }
                      }}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                <ErrorMessage
                  name="otp"
                  component="span"
                  className="text-xs text-red-500 text-center"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || values.otp.length !== 4}
                  className="btn bg-primary text-white w-full border-none hover:opacity-90 transition mt-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Verifying...
                    </span>
                  ) : (
                    "Verify"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

const PhoneComponent: React.FC<SignUpProps> = ({
  currentStep,
  onStepChange,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <PhoneComponentContent
      currentStep={currentStep}
      onStepChange={onStepChange}
    />
  );
};

export default PhoneComponent;
