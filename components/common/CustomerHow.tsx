"use client";

import { howForCustomers } from "@/config/config";
import React from "react";

const CustomerHow: React.FC = () => {
  return (
    <div className="flex justify-center my-5">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-1 max-w-5xl w-full px-4">
        {howForCustomers.map((card, index) => (
          <div
            key={index}
            className="shadow-xl hover:shadow-xl rounded-xl p-6 flex flex-col items-start"
          >
            <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-[#FDF5AD]">
              <img
                src={`/${card.icon}.svg`}
                alt={card.title}
                className="w-5 h-5"
              />
            </div>

            <h3 className="md:text-lg text-md font-semibold text-[#0F0049] my-5">
              {card.title}
            </h3>
            <ul className="font-normal md:text-sm text-xs list-disc list-inside space-y-2">
              {card.list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerHow;
