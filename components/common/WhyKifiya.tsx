"use client";

import React from "react";

interface Option {
  icon: string;
  title: string;
  desc: string;
}

const WhyKifiya: React.FC = () => {
  const cards: Option[] = [
    {
      icon: "convinience",
      title: "Convenience",
      desc: "Visit a nearby merchant to complete your KYC and apply for financing if you don't have a smartphone.",
    },
    {
      icon: "access",
      title: "Digital Access",
      desc: "After applying, you'll receive a notification about your financing approval and limit.",
    },
    {
      icon: "growth",
      title: "Growth Opportunities",
      desc: "Visit the merchant, select your device, and confirm the purchase by making the required down payment.",
    },
  ];

  return (
    <div className="bg-primary px-4 sm:px-8 md:px-12 lg:px-20 py-10 rounded-2xl mx-auto max-w-5xl">
      {cards.map((card, index) => (
        <React.Fragment key={index}>
          <div className="relative py-8 px-4 sm:px-6 h-48">
            <div className="absolute top-4 right-4">
              <img
                src={`/${card.icon}.svg`}
                alt={card.title}
                className="w-8 h-8"
              />
            </div>

            <div className="h-full flex flex-col justify-center">
              <h3 className="md:text-xl text-lg font-bold text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 md:text-sm text-xs">{card.desc}</p>
            </div>
          </div>

          {index < cards.length - 1 && <div className="w-full h-px bg-black" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WhyKifiya;
