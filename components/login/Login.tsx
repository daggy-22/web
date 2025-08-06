"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { toast } from "react-hot-toast";
import { customerLogin, fetchCustomerProfile } from "@/libs/api";
import useUserStore from "@/stores/userStore";
import useCustomerProfileStore from "@/stores/customerProfileStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type FormData = {
  username: string;
  password: string;
};

const LoginComponent = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const { setProfile } = useCustomerProfileStore((state) => state);
  const router = useRouter();

  useEffect(() => setIsMounted(true), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const loginMutation = useMutation({
    mutationFn: async (payload: { username: string; password: string }) => {
      const response = await customerLogin(payload);
      return response;
    },
    onSuccess: async (response) => {
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
      setProfile(customerProfile);

      toast.success("Login successful!");
      router.push("/");
    },
    onError: (error: any) => {
      if (error?.response?.status === 404 || error?.response?.status === 401) {
        toast.error("Invalid credentials.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let { username, password } = data;

    if (!/^(09|07)\d{8}$/.test(username)) {
      toast.error("Phone number must start with 09 or 07 and be 10 digits.");
      return;
    }

    if (username.startsWith("0")) {
      username = "251" + username.slice(1);
    }

    loginMutation.mutate({ username, password });
  };

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <AiOutlineLoading3Quarters className="animate-spin text-3xl text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="mb-4">
            <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
              Welcome Back
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">Log In</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Access your account using your phone and password
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              id="username"
              type="text"
              placeholder="09********"
              {...register("username", {
                required: "Phone Number is required",
                pattern: {
                  value: /^09\d{8}$/,
                  message: "Phone number must start with 09 and be 10 digits.",
                },
              })}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-gray-50 ${
                errors.username
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-primary/40"
              } transition-all`}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-gray-50 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-primary/40"
                } transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-70 flex items-center justify-center"
          >
            {loginMutation.isPending ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          Forgot password?{" "}
          <Link
            href="/auth/reset-password"
            className="text-primary font-medium hover:underline"
          >
            Reset password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
