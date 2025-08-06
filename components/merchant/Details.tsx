"use client";

import { Merchant } from "@/libs/interfaces";
import React from "react";



interface MerchantDetailsRightProps {
  merchant: Merchant;
}

const MerchantDetails: React.FC<MerchantDetailsRightProps> = ({
  merchant
}) => {
  return (
    <div className="md:w-1/2 md:mt-10 mt-5">
      <h1 className="text-2xl font-bold mb-2">About</h1>

      {/* Grid Container */}
      <div className="mt-4 grid grid-cols-[auto_1fr] gap-y-4 gap-x-1 md:text-md text-sm">
        {/* Location */}
        <div className="flex items-center">
          <img src="/location.svg" className="w-6 h-6 mr-1" />
        </div>
        <p>{merchant?.name}</p>

        {/* Phone */}
        <div className="flex items-center">
          <img src="/phone.svg" className="w-6 h-6 mr-1" />
        </div>
        <p>{merchant?.mobileNumber}</p>

        {/* Email */}
        <div className="flex items-center">
          <img src="/email.svg" className="w-6 h-6 mr-1" />
        </div>
        <p>{merchant?.email}</p>

        {/* Website */}
        <div className="flex items-center">
          <img src="/web.svg" className="w-6 h-6 mr-1" />
        </div>
        <p>{merchant?.email}</p>

        {/* Working Hours */}
        <div className="flex items-center">
          <img src="/clock.svg" className="w-6 h-6 mr-1" />
        </div>
        <p>{merchant?.name}</p>
      </div>
    </div>
  );
};

export default MerchantDetails;