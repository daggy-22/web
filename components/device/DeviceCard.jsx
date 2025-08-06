"use client";

import React from "react";
import { getImageUrl } from "@/utils/helper";
import {
  FaMobileAlt,
  FaBatteryThreeQuarters,
  FaCamera,
  FaPalette,
  FaMoneyBill,
} from "react-icons/fa";
import useSelectedDeviceStore from "@/stores/selectedDeviceStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DeviceCard({
  device,
  isOnHomePage = false,
  showFinancingBtn = true,
}) {
  const {
    id,
    isActive,
    deviceName,
    storage,
    ram,
    batteryCapacity,
    cameraQuality,
    color,
    maximumPrice,
  } = device;

  const router = useRouter();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
  }).format(maximumPrice);

  const specs = [
    {
      icon: <FaMobileAlt size={16} />,
      value: `${storage}/${ram}`,
    },
    {
      icon: <FaBatteryThreeQuarters size={16} />,
      value: batteryCapacity,
    },
    {
      icon: <FaCamera size={16} />,
      value: cameraQuality.slice(0, 6),
    },
    {
      icon: <FaPalette size={16} />,
      value: color,
    },
  ];

  const setSelectedDevice = useSelectedDeviceStore((state) => state.setDevice);

  const updateSelectedDevice = (e) => {
    e.preventDefault();
    setSelectedDevice(device);
    router.push("/financing");
  };

  return (
    <Link href={`products/${device.id}`} passHref>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${
          !isOnHomePage
            ? "w-full sm:w-[320px] md:w-[400px]"
            : "w-[85vw] sm:w-[320px] md:w-[400px]"
        } bg-white shadow-lg hover:shadow-2xl rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 ease-in-out relative overflow-hidden group`}
      >
        {isOnHomePage && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`absolute top-2 right-2 ${
              isActive ? "bg-emerald-500" : "bg-red-500 animate-pulse"
            } text-white text-xs font-semibold py-1 px-3 rounded-full z-10`}
          >
            {isActive ? "Available" : "Inactive"}
          </motion.div>
        )}

        <div className="overflow-hidden rounded-lg relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10" />
          <img
            src={getImageUrl(id)}
            alt={deviceName}
            className="w-full h-[300px] object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
            {deviceName}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 overflow-x-auto py-1 scrollbar-hide">
            {specs.map(
              (spec, index) =>
                spec.value && (
                  <React.Fragment key={index}>
                    {index > 0 && <span className="text-gray-300">|</span>}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1 flex-shrink-0 px-2 py-1 rounded-lg bg-gray-50"
                    >
                      <span className="text-gray-500">{spec.icon}</span>
                      <span className="font-medium">{spec.value}</span>
                    </motion.div>
                  </React.Fragment>
                )
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <FaMoneyBill size={20} className="text-emerald-500" />
            <p className="text-xl font-extrabold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              {formattedPrice}
            </p>
          </div>
        </div>

        {showFinancingBtn && (
          <motion.div className="mt-4 relative" whileHover={{ scale: 1.01 }}>
            <button
              disabled={!isActive && isOnHomePage}
              onClick={updateSelectedDevice}
              className={`w-full py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out relative overflow-hidden ${
                isActive
                  ? "bg-gradient-to-r from-black to-gray-800 text-white hover:shadow-lg hover:shadow-emerald-500/20"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isActive ? (
                <>
                  <span className="relative z-10">Get Financing</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              ) : (
                "Not Available"
              )}
            </button>
          </motion.div>
        )}

        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-emerald-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -top-5 -left-5 w-16 h-16 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
      </motion.div>
    </Link>
  );
}
