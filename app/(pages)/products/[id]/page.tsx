"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ProductDetails from "@/components/device/Details";
import DeviceCard from "@/components/device/DeviceCard";
import MapView from "@/components/merchant/MapView";
import { useParams, useRouter } from "next/navigation";
import { constructOrderPayload, getImageUrl } from "@/utils/helper";
import NotFoundComponent from "@/components/common/utility/Notfound";
import { Product, Merchant } from "@/libs/interfaces";
import { fetchMerchants, orderDevice, fetchDevice } from "@/libs/api";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FaSpinner } from "react-icons/fa";
import { FiChevronLeft, FiPhoneCall } from "react-icons/fi";
import { FaMapMarkedAlt } from "react-icons/fa";
import useCustomerStore from "@/stores/customerStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useSelectedDeviceStore from "@/stores/selectedDeviceStore";
import usePaymentPlansStore from "@/stores/paymentPlansStore";

const ProductDetailClient = () => {
  const params = useParams();
  const deviceId = params?.id as string;

  const customer = useCustomerStore((state) => state.customer);
  const { device, setDevice } = useSelectedDeviceStore((state) => state);

  const [selectedDevice, setSelectedDevice] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const setPlans = usePaymentPlansStore((state) => state.setPlans);

  const router = useRouter();
  const handleBack = () => router.back();

  useEffect(() => {
    const fetchDeviceData = async () => {
      if (!deviceId) {
        setIsLoading(false);
        return;
      }

      try {
        const deviceData = await fetchDevice(deviceId);
        setSelectedDevice(deviceData);
      } catch (error) {
        console.error("Error fetching device data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeviceData();
  }, [deviceId]);

  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        const merchantData = await fetchMerchants();
        setMerchants(merchantData.content);
      } catch (error) {
        console.error("Error fetching merchants:", error);
      }
    };

    fetchMerchantData();
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleMerchantSelect = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setIsDropdownOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: orderDevice,
    onSuccess: (data) => {
      toast.success("Order drafted successfully");
      setDevice({
        ...device,
        orderId: data.orderId,
        merchantPhone: selectedMerchant?.mobileNumber,
      });
      setPlans(data.data.paymentPlans);
      router.push("/financing/payment/plan");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(`Failed to place order: ${error.message}`);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedMerchant && selectedDevice && customer) {
      const payload = constructOrderPayload(
        selectedMerchant.id,
        customer,
        selectedDevice
      );
      mutate(payload);
    } else {
      toast.error(
        "Please select a merchant and ensure customer data is available."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-2xl" />
      </div>
    );
  }

  if (!selectedDevice) return <NotFoundComponent />;

  const similarProducts = [selectedDevice];

  return (
    <div>
      {" "}
      <div className="w-full bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="p-2 rounded bg-gray-200 h-14" onClick={handleBack}>
              <FiChevronLeft className="w-10 h-10 text-gray-700" />
            </div>
            <div className="md:w-1/2 flex flex-col gap-1 md:mt-20">
              <img
                src={getImageUrl(selectedDevice?.id)}
                alt={selectedDevice?.deviceName}
                className="w-full h-[350px] object-contain rounded-lg shadow-xs"
              />
              <div className="flex gap-2 my-4">
                <img
                  src={getImageUrl(selectedDevice?.id)}
                  className="w-1/3 h-24 object-contain rounded-lg shadow-sm"
                  alt="sample-phone"
                />
                <img
                  src={getImageUrl(selectedDevice?.id)}
                  className="w-1/3 h-24 object-contain rounded-lg shadow-sm"
                  alt="sample-phone"
                />
                <img
                  src={getImageUrl(selectedDevice?.id)}
                  className="w-1/3 h-24 object-contain rounded-lg shadow-sm"
                  alt="sample-phone"
                />
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col gap-4 md:px-5">
              <ProductDetails product={selectedDevice} />
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <span className="text-gray-700">
                    {selectedMerchant
                      ? selectedMerchant.name
                      : "Select a Merchant and Order"}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 ml-2 text-gray-500 transition-transform ${
                      isDropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="max-h-60 overflow-y-auto">
                      {merchants.map((merchant) => (
                        <div
                          key={merchant.id}
                          onClick={() => handleMerchantSelect(merchant)}
                          className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="font-medium text-gray-900">
                            {merchant.name}
                          </div>
                          <div className="flex gap-2">
                            <div className="text-sm flex gap-2 items-center text-gray-500">
                              <FiPhoneCall className="text-gray-600" />
                              {merchant.mobileNumber}
                            </div>
                            <div className="text-sm flex gap-2 items-center text-gray-500">
                              <FaMapMarkedAlt className="text-gray-600" />
                              Bole
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedMerchant && (
                <button
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Confirm Order with ${selectedMerchant.name}`
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {similarProducts.length > 0 && (
        <div className="container mx-auto px-4 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Similar Items
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {similarProducts.map((device) => (
              <div key={device.id} className="flex-shrink-0 w-48 md:w-56">
                <DeviceCard device={device} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Available Locations
        </h2>
        <MapView fullWidth={true} />
      </div>
    </div>
  );
};

// Dynamically import the component with SSR disabled
const ProductDetail = dynamic(() => Promise.resolve(ProductDetailClient), {
  ssr: false,
});

export default ProductDetail;
