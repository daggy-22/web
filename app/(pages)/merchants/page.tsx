"use client";
import React, { useState } from "react";
import SearchBar from "@/components/device/SearchBar";
import FilterSidebar from "@/components/device/FilterSidebar";
import MerchantCard from "@/components/merchant/MerchantCard";
import PaginationIndicator from "@/components/common/utility/Pagination";
import { fetchMerchants } from "@/libs/api";
import { Merchant } from "@/libs/interfaces";
import { useQuery } from "@tanstack/react-query";
import NoResults from "@/components/common/utility/NoSearchResults";
import MerchantSkeleton from "@/components/merchant/MerchantSkeleton";

export default function DevicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  const { data: merchantsData, isLoading } = useQuery({
    queryKey: [
      "merchants",
      currentPage,
      itemsPerPage,
      searchQuery,
      selectedLocation,
      priceOrder,
    ],
    queryFn: () => fetchMerchants(currentPage, itemsPerPage, searchQuery),
  });

  const merchants = merchantsData?.content || [];
  const totalItems = merchantsData?.page?.totalElements || 0;

  const uniqueLocations = [
    ...new Set(
      merchants
        .map((merchant: Merchant) => merchant.bankDetails.branchName)
        .filter(Boolean)
    ),
  ].sort();

  let filteredMerchants = !selectedLocation
    ? merchants
    : merchants.filter(
        (m: Merchant) =>
          m?.bankDetails?.branchName &&
          m?.bankDetails?.branchName
            .toLowerCase()
            .includes(selectedLocation.toLowerCase())
      );

  if (searchQuery) {
    filteredMerchants = filteredMerchants.filter((m: Merchant) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6 h-full">
          <div className="md:w-64 flex-shrink-0">
            <FilterSidebar
              brands={uniqueLocations as string[]}
              selectedBrand={selectedLocation}
              onSelectBrand={setSelectedLocation}
              priceOrder={priceOrder}
              onSelectPriceOrder={setPriceOrder}
              type="merchant"
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <SearchBar
                  query={searchQuery}
                  placeholder="Search for merchant you're looking for..."
                  onChangeQuery={setSearchQuery}
                />
              </div>
            </div>
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index}>
                      <MerchantSkeleton />
                    </div>
                  ))}
                </div>
              ) : filteredMerchants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {filteredMerchants.map((merchant: any) => (
                    <MerchantCard key={merchant.id} merchant={merchant} />
                  ))}
                </div>
              ) : (
                <NoResults />
              )}
            </div>
            {!isLoading && totalItems > 0 && (
              <div className="mt-auto">
                <PaginationIndicator
                  currentPage={currentPage + 1}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
