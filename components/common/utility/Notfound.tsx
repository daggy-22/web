import React from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi"; 

export default function NotFoundComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="mb-6 p-6 bg-gray-100 rounded-full">
        <FiSearch className="w-16 h-16 text-gray-400" />
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Item Not Found
      </h1>

      <p className="text-lg text-gray-600 mb-8 max-w-md">
        The item you&apos;re looking for doesn&apos;t exist. Please check the details or
        explore other options.
      </p>

      <Link href="/">
        <button className="bg-black text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-300 ease-in-out">
          Go Home
        </button>
      </Link>
    </div>
  );
}