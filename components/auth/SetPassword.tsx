"use client";
import React, { useState, FormEvent, Suspense } from "react";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  customerLogin,
  fetchCustomerProfile,
  setUserPassword,
  setPassword,
  resetUserPassword,
} from "@/libs/api";
import { FiChevronLeft } from "react-icons/fi";
import useTokenStore from "@/stores/tokenStore";
import useCustomerStore from "@/stores/customerStore";
import useUserStore from "@/stores/userStore";
import useCustomerIdStore from "@/stores/customerIdStore";
import useResetPhoneStore from "@/stores/resetPhoneStore";

interface FormData {
  password: string;
  confirmPassword: string;
}

const SetPassword: React.FC<{ fromReset?: boolean }> = ({
  fromReset = false,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);
  const setCustomer = useCustomerStore((state) => state.setCustomer);
  const customerId = useCustomerIdStore((state) => state.id) || "";
  const resetPhone = useResetPhoneStore((state) => state.resetPhone);
  const clearResetPhone = useResetPhoneStore((state) => state.clearResetPhone);

  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });

  const username = useTokenStore((state) => state.phone);

  const goBack = () => router.back();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validatePassword = (): boolean => {
    return formData.password.length >= 6;
  };

  const validateConfirmPassword = (): boolean => {
    return formData.password === formData.confirmPassword;
  };

  // eslint-disable-next-line
  const onCustomerLogin = async (response: any) => {
    const now = Date.now();
    const tokenExpiry = now + response.tokenResponse.expires_in * 1000;
    const refreshTokenExpiry =
      now + response.tokenResponse.refresh_expires_in * 1000;

    setUser({
      id: response.customerId,
      name: response.customerName,
      token: response.tokenResponse.access_token,
      refreshToken: response.tokenResponse.refresh_token,
      tokenExpiry,
      refreshTokenExpiry,
    });

    const customerProfile = await fetchCustomerProfile(response.customerId);
    setCustomer(customerProfile);
  };

  const handleSubmit = async (e?: FormEvent): Promise<void> => {
    e?.preventDefault();

    try {
      if (loading) return;
      setLoading(true);

      if (!validatePassword()) {
        toast.error("Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }

      if (!validateConfirmPassword()) {
        toast.error("Passwords do not match.");
        setLoading(false);
        return;
      }

      if (fromReset) {
        // Reset password flow - use resetUserPassword API with username and password
        if (!resetPhone) {
          toast.error("Reset phone number not found. Please try again.");
          setLoading(false);
          return;
        }

        await resetUserPassword({
          username: resetPhone,
          password: formData.password,
        });

        // Login with new password
        const res = await customerLogin({
          username: resetPhone,
          password: formData.password,
        });

        onCustomerLogin(res);
        toast.success("Password reset successfully.");
        clearResetPhone(); // Clear the reset phone from store
        router.push("/");
      } else {
        // Create password flow - use setUserPassword API
        await setUserPassword(customerId, {
          password: formData.password,
          confirmPassword: formData.password,
        });
        const res = await customerLogin({
          username,
          password: formData.password,
        });

        onCustomerLogin(res);
        toast.success("Password set successfully.");
        router.push("/initiate");
      }

      setLoading(false);
    } catch (e: any) {
      const errorCode = e?.response?.data?.code;
      const errorDetails = e?.response?.data?.details;

      if (
        errorCode === "asset_finance.auth.keycloak_user_creation_failed" &&
        errorDetails === "Keycloak user creation failed"
      ) {
        toast.error(
          "Phone number seems to be taken. Please go back and use a new one."
        );
      } else {
        toast.error("Error setting a password. Try again!");
      }

      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center min-h-full w-full">
        <div className="w-full max-w-md px-4">
          <div className="mb-6 flex justify-start items-center">
            <button
              onClick={goBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Go back"
            >
              <FiChevronLeft className="w-5 h-5 mr-1" />
              <span>Back</span>
            </button>
          </div>

          <div className="text-2xl font-bold py-4 text-center">
            Set Your Password
          </div>
          <div className="text-gray-600 text-center mb-6">
            Create a new password to continue using your account.
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white p-5 rounded-lg shadow-md w-full"
          >
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="border rounded-xl px-4 h-12 focus:outline-none w-full"
                placeholder="Enter Password"
                required
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="border rounded-xl px-4 h-12 focus:outline-none w-full"
                placeholder="Confirm Password"
                required
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary hover:opacity-50 border-none text-white w-full flex justify-center items-center"
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Continue →"}
            </button>
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default SetPassword;
