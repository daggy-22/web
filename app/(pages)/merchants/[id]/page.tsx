"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchMerchant } from "@/libs/api";
import { Merchant } from "@/libs/interfaces";
import MapView from "@/components/merchant/MapView";
import { useRouter } from "next/navigation";
import MerchantDetails from "@/components/merchant/Details";
import { MerchantDetailSkeleton } from "@/components/merchant/skeleton";

export default function MerchantDetailsPage() {
  // Extract merchantId from the URL
  const params = useParams();
  const merchantId = params.id as string;

  // Fetch merchant details using React Query
  const {
    data: merchant,
    isLoading,
    isError,
    error,
  } = useQuery<Merchant, Error>({
    queryKey: ["merchant", merchantId],
    queryFn: () => fetchMerchant(merchantId),
  });

  const router = useRouter();
  const handleBack = () => router.back();

  // Display error state
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col md:flex-row items-start gap-4 md:w-1/3">
          <button
            onClick={handleBack}
            className="flex items-center justify-center p-3 rounded-full hover:bg-gray-300 transition-colors"
          >
            <img src="/back.svg" className="w-6 h-6" />
          </button>

          {isLoading ? (
            <div className="w-full shadow-lg rounded-2xl flex flex-col gap-4 p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-300 rounded"></div>
              <div className="h-6 w-3/4 bg-gray-300 rounded mx-auto"></div>
              <div className="h-10 w-[80%] bg-gray-300 rounded mx-auto"></div>
            </div>
          ) : (
            <div className="w-full shadow-lg rounded-2xl flex flex-col gap-4 p-4">
              <img
                src="/shop.png"
                alt={merchant?.name}
                className="w-full h-48 rounded"
              />
              <p className="md:text-2xl text-lg text-black font-bold text-center">
                {merchant?.name}
              </p>
              <div className="flex justify-center items-center">
                <button className="bg-gray-800 w-[80%] py-3 text-white rounded-3xl flex justify-center items-center md:text-sm text-xs">
                  <img src="/call.svg" className="mr-2 w-5 h-5" />
                  Call Merchant
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="shadow-lg rounded-2xl w-full md:w-2/3 md:px-10 px-4">
          {isLoading ? (
            <MerchantDetailSkeleton />
          ) : (
            <MerchantDetails merchant={merchant as Merchant} />
          )}
        </div>
      </div>

      <div className="mt-8 bg-transparent">
        <h2 className="md:text-2xl text:lg font-bold mb-4">Location</h2>
        <MapView fullWidth={true} />
      </div>
    </div>
  );
}
