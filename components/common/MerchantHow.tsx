"use client";

import React from "react";

interface Option {
  icon: string;
  title: string;
  list: string[];
}

const MerchantHow: React.FC = () => {
  const cards: Option[] = [
    {
      icon: "merchant/partner",
      title: "Become a Partner",
      list: [
        "Register as a Kifiya merchant to offer device financing.",
        "Get access to Kifiya’s platform to onboard customers, process applications, and boost your sales.",
      ],
    },
    {
      icon: "merchant/disburse",
      title: "Instant Disbursement",
      list: [
        "Receive instant disbursement for financed devices, improving cash flow and eliminating delays.",
      ],
    },
    {
      icon: "merchant/sales",
      title: "Increase Sales",
      list: [
        "Attract more customers by offering financing options and grow your business.",
        "Become key part of the digital access ecosystem, bridging the gap for underserved communities",
      ],
    },
    {
      icon: "purchase",
      title: "Simple Process",
      list: [
        "The Kifiya Merchant App makes it easy to onboard customers, verify their KYC, and manage transactions efficiently.",
      ],
    },
  ];

  return (
    <div className="flex justify-center md:my-5 my-2">
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 gap-0.5 max-w-5xl w-full px-4">
        {cards.map((card, index) => (
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

            <h3 className="md:text-lg text-md font-semibold text-[#0F0049] md:my-5 my-2">
              {card.title}
            </h3>
            <ul className="md:text-sm text-xs list-none list-inside space-y-2 font-normal">
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

export default MerchantHow;
