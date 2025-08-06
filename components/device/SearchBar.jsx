"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SearchBar({
  query,
  onChangeQuery,
  placeholder = "Search for device you're looking for...",
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [iconMove, setIconMove] = useState("-3rem");

  useEffect(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    const updateIconPosition = () =>
      setIconMove(width < 640 ? "-1rem" : "-3rem");

    updateIconPosition();
    typeof window !== "undefined" &&
      window.addEventListener("resize", updateIconPosition);

    return () =>
      typeof window !== "undefined" &&
      window.removeEventListener("resize", updateIconPosition);
  }, []);

  return (
    <div className="relative mb-4">
      <motion.input
        type="text"
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 py-2 px-4 bg-gray-100 rounded-2xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-gray-100 focus:shadow-md"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        animate={{ width: isFocused ? "110%" : "100%" }}
      />
      <motion.svg
        className="w-5 h-5 text-gray-400 absolute top-1/2 transform -translate-y-1/2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        animate={{ right: isFocused ? iconMove : "1rem" }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </motion.svg>
    </div>
  );
}
