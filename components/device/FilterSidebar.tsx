/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

interface RangeFilter {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
}

interface FilterSidebarProps {
  brands: string[];
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  priceOrder: string;
  onSelectPriceOrder: (order: string) => void;
  priceRange?: RangeFilter;
  storageRange?: RangeFilter;
  ramRange?: RangeFilter;
  batteryRange?: RangeFilter;
  onPriceRangeChange?: (min: number, max: number) => void | undefined;
  onStorageRangeChange?: (min: number, max: number) => void | undefined;
  onRamRangeChange?: (min: number, max: number) => void | undefined;
  onBatteryRangeChange?: (min: number, max: number) => void | undefined;
  onClearFilters?: () => void;
  hasFilters?: boolean;
  type?: string;
}

const RangeFilterSection: React.FC<{
  title: string;
  unit: string;
  range: RangeFilter | undefined;
  onChange: (
    min: number | undefined,
    max: number | undefined
  ) => void | undefined;
}> = ({ title, unit, range, onChange }) => {
  if (!range || typeof onChange !== "function") return;
  const getPercentage = (value: number) => {
    if (!range.min || !range.max || typeof value === "undefined") return 0;
    return ((value - range.min) / (range.max - range.min)) * 100;
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), range.currentMax - 1);
    onChange(newMin, range.currentMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), range.currentMin + 1);
    onChange(range.currentMin, newMax);
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-2">{title}</h2>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>
          {range.currentMin} {unit}
        </span>
        <span>
          {range.currentMax} {unit}
        </span>
      </div>
      <div className="relative h-10 mb-4">
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full"></div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-blue-500 rounded-full"
          style={{
            left: `${getPercentage(range.currentMin)}%`,
            right: `${100 - getPercentage(range.currentMax)}%`,
          }}
        ></div>
        <input
          type="range"
          min={range.min}
          max={range.max}
          value={range.currentMin}
          onChange={handleMinChange}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />
        <input
          type="range"
          min={range.min}
          max={range.max}
          value={range.currentMax}
          onChange={handleMaxChange}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20"
        />
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer z-30"
          style={{
            left: `${getPercentage(range.currentMin)}%`,
          }}
        ></div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer z-30"
          style={{
            left: `${getPercentage(range.currentMax)}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default function FilterSidebar({
  brands,
  selectedBrand,
  onSelectBrand,
  priceOrder,
  onSelectPriceOrder,
  priceRange,
  storageRange,
  ramRange,
  batteryRange,
  onPriceRangeChange,
  onStorageRangeChange,
  onRamRangeChange,
  onBatteryRangeChange,
  onClearFilters,
  hasFilters,
  type = "device",
}: FilterSidebarProps) {
  return (
    <aside className="w-full bg-white p-4 border rounded-lg shadow-sm space-y-6">
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
        >
          Clear Filters
        </button>
      )}

      <div>
        <h2 className="font-semibold mb-2">
          {type === "device" ? "Brands" : "Locations"}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <button
              onClick={() => onSelectBrand("")}
              className={`block text-left hover:underline ${
                !selectedBrand ? "font-bold" : ""
              }`}
            >
              All {type === "device" ? "Brands" : "Locations"}
            </button>
          </li>
          {brands.map((brand) => (
            <li key={brand}>
              <button
                onClick={() => onSelectBrand(brand)}
                className={`block text-left hover:underline ${
                  selectedBrand === brand ? "font-bold" : ""
                }`}
              >
                {brand}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {type === "device" && (
        <>
          <h2 className="font-semibold mb-2">Price</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => onSelectPriceOrder("")}
                className={`block text-left hover:underline ${
                  !priceOrder ? "font-bold" : ""
                }`}
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectPriceOrder("low-high")}
                className={`block text-left hover:underline ${
                  priceOrder === "low-high" ? "font-bold" : ""
                }`}
              >
                Low - High
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectPriceOrder("high-low")}
                className={`block text-left hover:underline ${
                  priceOrder === "high-low" ? "font-bold" : ""
                }`}
              >
                High - Low
              </button>
            </li>
          </ul>

          <RangeFilterSection
            title="Price"
            unit="ETB"
            range={priceRange}
            onChange={onPriceRangeChange as any}
          />

          <RangeFilterSection
            title="Storage"
            unit="GB"
            range={storageRange}
            onChange={onStorageRangeChange as any}
          />

          <RangeFilterSection
            title="RAM"
            unit="GB"
            range={ramRange}
            onChange={onRamRangeChange as any}
          />

          <RangeFilterSection
            title="Battery"
            unit="mAh"
            range={batteryRange}
            onChange={onBatteryRangeChange as any}
          />
        </>
      )}
    </aside>
  );
}
