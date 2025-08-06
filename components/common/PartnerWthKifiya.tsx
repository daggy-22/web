"use client";

import React from "react";
import { partnerWithKifiya } from "@/config/config";

const PartnerWithKifiya: React.FC = () => {
  return (
    <div className="flex justify-center my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full px-4">
        {partnerWithKifiya.map((card, index) => (
          <div
            key={index}
            className="bg-[#F9FAFB] shadow-xs hover:shadow-xl rounded-xl p-10 flex flex-col items-start justify-start"
          >
            <div className="flex gap-2 -ml-7 items-start justify-start">
              <img
                src={`/${card.icon}.svg`}
                alt={card.title}
                className="w-7 h-7 mb-5"
              />

              <h3 className="md:text-lg texl-md font-bold text-gray-800 mb-3">
                {card.title}
              </h3>
            </div>
            <ul className="text-gray-600 md:text-sm text-xs text-left space-y-2">
              {card.desc.map((item, index) => (
                <li key={index} className="list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerWithKifiya;
