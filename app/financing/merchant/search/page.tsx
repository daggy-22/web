"use client";

import { useState, useEffect } from "react";
import StepIndicator from "@/components/form/StepIndicator";
import MerchantSearch from "@/components/merchant/MerchantSearch";
import {
  FaClock,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaShoppingCart,
} from "react-icons/fa";
import Link from "next/link";
import dynamic from "next/dynamic";
import useSelectedDeviceStore from "@/stores/selectedDeviceStore";
import useCustomerStore from "@/stores/customerStore";
import { constructOrderPayload } from "@/utils/helper";
import { orderDevice } from "@/libs/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import usePaymentPlansStore from "@/stores/paymentPlansStore";
import { fetchMerchants } from "@/libs/api";

const MapView = dynamic(() => import("@/components/merchant/MapView"), {
  ssr: false,
});

interface Merchant {
  id: string;
  name: string;
  location: string;
  mobileNumber: string;
  image: string;
  email: string;
  website: string;
  openingHours: string;
  services: string;
  lat?: number;
  lng?: number;
}

interface PaginationParams {
  page: number;
  size: number;
  query?: string;
}

const MerchantsView = ({
  onMerchantSelect,
  merchants,
  onSearch,
}: {
  onMerchantSelect: (merchant: Merchant) => void;
  merchants: Merchant[];
  onSearch: (query: string) => void;
}) => {
  const locations = merchants.map((merchant) => ({
    id: merchant.id,
    lat: merchant.lat || 0,
    lng: merchant.lng || 0,
    name: merchant.name,
    link: merchant.website,
  }));

  return (
    <>
      <div className="min-h-screen md:mt-20 mt-10 w-full">
        <div className="flex flex-col md:gap-4 gap-2 justify-center items-center">
          <StepIndicator currentStep={7} totalSteps={8} />
          <MerchantSearch onSearch={onSearch} />
        </div>
        {/* eslint-disable-next-line */}
        <MapView locations={locations} onSelect={onMerchantSelect as any} />
      </div>
    </>
  );
};

const MerchantsNearBy = () => {
  const [expandedMerchantId, setExpandedMerchantId] = useState<Merchant | null>(
    null
  );
  const [isReadyToPurchase, setIsReadyToPurchase] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 0,
    size: 10,
  });

  const router = useRouter();

  // Fetch merchants using React Query with pagination and search
  const {
    data: merchantsResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["merchants", paginationParams, searchQuery],
    queryFn: () =>
      fetchMerchants(
        Number(paginationParams.page),
        Number(paginationParams.size),
        searchQuery
      ),
    enabled: !!paginationParams.page && !!paginationParams.size,
  });

  useEffect(() => {
    if (isError && error) {
      toast.error("Failed to load merchants");
      console.error("Fetch merchants error:", error);
    }
  }, [isError, error]);

  const merchants = merchantsResponse?.content || [];
  const totalPages = merchantsResponse?.page?.totalPages || 0;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPaginationParams((prev) => ({ ...prev, page: 0 })); // Reset to first page on new search
  };

  useEffect(() => {
    refetch();
  }, [paginationParams, searchQuery, refetch]);

  const setPlans = usePaymentPlansStore((state) => state.setPlans);
  const setDevice = useSelectedDeviceStore((state) => state.setDevice);
  const device = useSelectedDeviceStore((state) => state.device);
  const customer = useCustomerStore((state) => state.customer);

  const selectedMerchant = (merchants as Merchant[])?.find(
    (merchant) => merchant.id === expandedMerchantId?.id
  );

  const { mutate: createOrder, isPending: isCreatingOrder } = useMutation({
    mutationFn: async () => {
      if (!device || !customer) {
        throw new Error("Missing device or customer data");
      }
      const payload = constructOrderPayload(
        expandedMerchantId?.id as string,
        customer,
        device
      );
      return await orderDevice(payload);
    },
    onSuccess: (data) => {
      setIsReadyToPurchase(true);
      toast.success("Order drafted successfully");
      setDevice({
        ...device,
        orderId: data.orderId,
        merchantPhone: expandedMerchantId?.mobileNumber,
      });
      setPlans(data.paymentPlans);
      router.push("/financing/payment/plan");
    },
    onError: (error) => {
      toast.error("Order creation failed");
      console.log(error);
    },
  });

  const handleProceedToPurchase = () => {
    if (!device || !customer) {
      toast.error("Device or customer data missing");
      return;
    }
    createOrder();
  };

  const handleMerchantSelect = (merchant: Merchant) => {
    setExpandedMerchantId(merchant);
  };

  const handlePageChange = (newPage: number) => {
    setPaginationParams((prev) => ({ ...prev, page: newPage }));
  };

  // Loading Skeleton Component
  const MerchantSkeleton = () => (
    <div className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="p-3 bg-white rounded-lg shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 rounded-lg bg-gray-200 animate-pulse"></div>
            <div className="flex flex-col space-y-2 flex-1">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">
          Failed to load merchants. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 bg-gray-50 md:grid-cols-3 gap-6 h-full w-full">
      <div className="md:col-span-2">
        <MerchantsView
          onMerchantSelect={handleMerchantSelect}
          merchants={merchants}
          onSearch={handleSearch}
        />
      </div>

      <div className="md:col-span-1 p-4 rounded-lg shadow-sm">
        {isReadyToPurchase ? (
          <></>
        ) : expandedMerchantId === null ? (
          <>
            <h2 className="text-xl font-bold md:text-3xl mb-4 md:mt-14 mt-7 text-center">
              Merchants Near You
            </h2>

            {isLoading ? (
              <MerchantSkeleton />
            ) : (
              <>
                <ul className="space-y-3">
                  {(merchants as Merchant[]).map((merchant) => (
                    <li
                      key={merchant.id}
                      className="p-3 bg-white rounded-lg shadow-xs cursor-pointer"
                      onClick={() => setExpandedMerchantId(merchant)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          className="w-32 h-32 rounded-lg object-cover"
                          src="/shop.png"
                          alt={merchant.name}
                        />
                        <div className="flex flex-col">
                          <h3 className="font-bold md:text-xl texl-lg">
                            {merchant.name}
                          </h3>
                          <p className="md:text-md text-sm text-gray-600">
                            <span className="font-bold">Distance:</span> 5km
                          </p>
                          <p className="md:text-md text-sm text-gray-600">
                            <span className="font-bold">Phone:</span>{" "}
                            {merchant.mobileNumber}
                          </p>
                          <p className="md:text-md text-sm text-gray-600">
                            <span className="font-bold">Device Available:</span>{" "}
                            Yes
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {!isLoading && merchants.length > 0 && (
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() =>
                        handlePageChange(paginationParams.page - 1)
                      }
                      disabled={paginationParams.page === 0}
                      className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                    >
                      &larr;
                    </button>
                    <span>
                      Page {paginationParams.page + 1} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        handlePageChange(paginationParams.page + 1)
                      }
                      disabled={paginationParams.page >= totalPages - 1}
                      className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                    >
                      &rarr;
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button
              className="text-gray-600 hover:text-gray-800 mb-4"
              onClick={() => setExpandedMerchantId(null)}
            >
              ← Back
            </button>

            <div className="space-y-4">
              <img
                className="w-full h-96 rounded-lg object-cover"
                src="/shop.png"
                alt={selectedMerchant?.name}
              />
              <h2 className="md:text-2xl text-lg font-bold">
                {selectedMerchant?.name}
              </h2>
              <p className="md:text-md text-sm text-gray-600">
                <FaMapMarkerAlt className="inline mr-1" />{" "}
                {/* {selectedMerchant?.location} */}
                Bole Atlas
              </p>
              <p className="md:text-md text-sm text-gray-600">
                <FaPhone className="inline mr-1" />{" "}
                {selectedMerchant?.mobileNumber}
              </p>
              <p className="md:text-md text-sm text-gray-600">
                <FaEnvelope className="inline mr-1" />
                {/* {selectedMerchant?.email} */}
                test@email.com
              </p>
              <p className="md:text-md text-sm text-gray-600">
                <a
                  href={selectedMerchant?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <FaGlobe className="inline mr-1" />{" "}
                  {/* {selectedMerchant?.website} */}
                  https://google.com
                </a>
              </p>
              <p className="md:text-md text-sm text-gray-600">
                <FaClock className="inline mr-1" />
                <strong>Opening Hours:</strong> {selectedMerchant?.openingHours}
              </p>

              <div className="flex flex-row gap-2 md:gap-4 mt-6 w-full">
                <Link
                  href={`tel:${selectedMerchant?.mobileNumber}`}
                  className="flex-1 min-w-0"
                >
                  <button className="w-full md:text-sm text-xs flex items-center justify-center gap-2 py-2 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition-all">
                    <FaPhone /> Call Merchant
                  </button>
                </Link>
                <button
                  className="flex-1 md:text-sm text-xs flex items-center justify-center gap-2 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-all min-w-0"
                  onClick={handleProceedToPurchase}
                  disabled={isCreatingOrder}
                >
                  <FaShoppingCart />{" "}
                  {isCreatingOrder ? "Processing..." : "Proceed to Purchase"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantsNearBy;
