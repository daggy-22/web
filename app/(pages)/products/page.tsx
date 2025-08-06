"use client";

import React, { useState, useEffect, Suspense } from "react";
import SearchBar from "@/components/device/SearchBar";
import FilterSidebar from "@/components/device/FilterSidebar";
import DeviceCard from "@/components/device/DeviceCard";
import { fetchDevices, fetchCustomerDevices } from "@/libs/api";
import { useQuery } from "@tanstack/react-query";
import NoResults from "@/components/common/utility/NoSearchResults";
import { Device } from "@/libs/interfaces";
import MerchantSkeleton from "@/components/merchant/MerchantSkeleton";
import useCustomerProfileStore from "@/stores/customerProfileStore";
import { useSearchParams } from "next/navigation";
import {
  extractNumberFromString,
  getMinMaxFromDevices,
} from "@/utils/extractNumbers";

interface RangeFilter {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
}

const Devices = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [priceOrder, setPriceOrder] = useState<string>("");
  const [withinLimit, setWithinLimit] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const customer = useCustomerProfileStore((state) => state.profile);

  const [priceRange, setPriceRange] = useState<RangeFilter>({
    min: 0,
    max: 0,
    currentMin: 0,
    currentMax: 0,
  });

  const [storageRange, setStorageRange] = useState<RangeFilter>({
    min: 0,
    max: 0,
    currentMin: 0,
    currentMax: 0,
  });

  const [ramRange, setRamRange] = useState<RangeFilter>({
    min: 0,
    max: 0,
    currentMin: 0,
    currentMax: 0,
  });

  const [batteryRange, setBatteryRange] = useState<RangeFilter>({
    min: 0,
    max: 0,
    currentMin: 0,
    currentMax: 0,
  });

  const updateRangeFilter = (
    range: RangeFilter,
    setRange: React.Dispatch<React.SetStateAction<RangeFilter>>,
    min: number,
    max: number
  ) => {
    setRange({
      ...range,
      min,
      max,
      currentMin: min,
      currentMax: max,
    });
  };

  const initializeRanges = (devices: Device[]) => {
    if (devices?.length > 0) {
      // Price range
      const prices = devices.map((device) => device.maximumPrice);
      updateRangeFilter(
        priceRange,
        setPriceRange,
        Math.min(...prices),
        Math.max(...prices)
      );

      const storage = getMinMaxFromDevices(devices, "storage");
      updateRangeFilter(
        storageRange,
        setStorageRange,
        storage.min,
        storage.max
      );

      const ram = getMinMaxFromDevices(devices, "ram");
      updateRangeFilter(ramRange, setRamRange, ram.min, ram.max);

      const battery = getMinMaxFromDevices(devices, "batteryCapacity");
      updateRangeFilter(
        batteryRange,
        setBatteryRange,
        battery.min,
        battery.max
      );
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedBrand("");
    setPriceOrder("");
    if (devicesData && castedDevicesData.length > 0) {
      initializeRanges(castedDevicesData);
    } else {
      updateRangeFilter(priceRange, setPriceRange, 0, 10000);
      updateRangeFilter(storageRange, setStorageRange, 0, 1000);
      updateRangeFilter(ramRange, setRamRange, 0, 100);
      updateRangeFilter(batteryRange, setBatteryRange, 0, 10000);
    }
  };

  useEffect(() => {
    setWithinLimit(searchParams.get("withinLimit") === "true");
  }, [searchParams]);

  const { data: devicesData = [], isLoading } = useQuery<Device[], Error>({
    queryKey: ["devices", searchQuery, withinLimit, customer?.id],
    queryFn: () =>
      withinLimit && customer?.id
        ? fetchCustomerDevices(customer.id, searchQuery)
        : fetchDevices(searchQuery),
    staleTime: 1000 * 60 * 5,
    enabled: !!(withinLimit ? customer?.id : true),
  });

  const castedDevicesData = devicesData as Device[];

  useEffect(() => {
    if (castedDevicesData?.length > 0) {
      initializeRanges(castedDevicesData);
    }
  }, [castedDevicesData]);

  const uniqueBrands = [
    ...new Set(
      castedDevicesData?.map((device: Device) => device.brand).filter(Boolean)
    ),
  ].sort() as string[];

  const filteredData = (devicesData as Device[])
    ?.filter((device: Device) =>
      selectedBrand
        ? device.brand.toLowerCase().includes(selectedBrand.toLowerCase())
        : true
    )
    .filter(
      (device: Device) =>
        device.maximumPrice >= priceRange.currentMin &&
        device.maximumPrice <= priceRange.currentMax
    )
    .filter((device: Device) => {
      const deviceStorage = extractNumberFromString(device.storage || "0");
      return (
        deviceStorage >= storageRange.currentMin &&
        deviceStorage <= storageRange.currentMax
      );
    })
    .filter((device: Device) => {
      const deviceRam = extractNumberFromString(device.ram || "0");
      return (
        deviceRam >= ramRange.currentMin && deviceRam <= ramRange.currentMax
      );
    })
    .filter((device: Device) => {
      const deviceBattery = extractNumberFromString(
        device.batteryCapacity || "0"
      );
      return (
        deviceBattery >= batteryRange.currentMin &&
        deviceBattery <= batteryRange.currentMax
      );
    })
    .sort((a: Device, b: Device) => {
      if (priceOrder === "low-high") return a.maximumPrice - b.maximumPrice;
      if (priceOrder === "high-low") return b.maximumPrice - a.maximumPrice;
      return 0;
    });

  const hasFilters =
    !!selectedBrand ||
    !!priceOrder ||
    !!searchQuery ||
    (castedDevicesData &&
      castedDevicesData.length > 0 &&
      (priceRange.currentMin !== priceRange.min ||
        priceRange.currentMax !== priceRange.max ||
        storageRange.currentMin !== storageRange.min ||
        storageRange.currentMax !== storageRange.max ||
        ramRange.currentMin !== ramRange.min ||
        ramRange.currentMax !== ramRange.max ||
        batteryRange.currentMin !== batteryRange.min ||
        batteryRange.currentMax !== batteryRange.max));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 flex-shrink-0">
            <FilterSidebar
              brands={uniqueBrands}
              selectedBrand={selectedBrand}
              onSelectBrand={setSelectedBrand}
              priceOrder={priceOrder}
              onSelectPriceOrder={setPriceOrder}
              priceRange={priceRange}
              storageRange={storageRange}
              ramRange={ramRange}
              batteryRange={batteryRange}
              onPriceRangeChange={(currentMin, currentMax) =>
                setPriceRange({
                  ...priceRange,
                  currentMin,
                  currentMax,
                })
              }
              onStorageRangeChange={(currentMin, currentMax) =>
                setStorageRange({
                  ...storageRange,
                  currentMin,
                  currentMax,
                })
              }
              onRamRangeChange={(currentMin, currentMax) =>
                setRamRange({ ...ramRange, currentMin, currentMax })
              }
              onBatteryRangeChange={(currentMin, currentMax) =>
                setBatteryRange({
                  ...batteryRange,
                  currentMin,
                  currentMax,
                })
              }
              onClearFilters={clearAllFilters}
              hasFilters={hasFilters}
            />
          </div>

          <div className="flex-1 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs">
                    <span
                      className={`px-3 py-2 rounded-full ${
                        !withinLimit
                          ? "bg-gray-200 text-gray-900 font-bold"
                          : "hover:bg-gray-100 cursor-pointer"
                      }`}
                      onClick={() => setWithinLimit(false)}
                    >
                      All Devices
                    </span>
                    {customer?.id && (
                      <span
                        className={`px-3 py-2 rounded-full ${
                          withinLimit
                            ? "bg-gray-200 text-gray-900 font-bold"
                            : "hover:bg-gray-100 cursor-pointer"
                        }`}
                        onClick={() => setWithinLimit(true)}
                      >
                        Within My Limit
                      </span>
                    )}
                  </div>
                  {hasFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>

                <div className="w-full max-w-2xl mx-auto">
                  <SearchBar
                    query={searchQuery}
                    placeholder="Search devices..."
                    onChangeQuery={setSearchQuery}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-10 gap-6">
              {isLoading ? (
                Array.from({ length: 9 }).map((_, index) => (
                  <MerchantSkeleton key={index} />
                ))
              ) : filteredData && filteredData.length > 0 ? (
                filteredData.map((device: Device) => (
                  <DeviceCard key={device.id} device={device} />
                ))
              ) : (
                <div className="col-span-full flex justify-center">
                  <NoResults />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DevicesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <Devices />
    </Suspense>
  );
}
