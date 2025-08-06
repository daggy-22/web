"use client";

import { kifiyaConstacts } from "@/config/config";
import React, { useState } from "react";
import { FaPhone, FaInfoCircle, FaPlus, FaMinus } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-gray-600 md:text-lg">
              Find answers to common questions about our services.
            </p>
          </div>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#F4F4F4] border-[#E5E7EB] sm:border-[0.5px] p-1.5 sm:p-2 px-5 sm:px-3 mb-4 rounded-xl"
            >
              <button
                className="w-full flex justify-between items-center py-4 sm:py-3 text-left md:text-lg text-sm font-medium text-[#1F2937] focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
                {openIndex === index ? (
                  <FaMinus className="text-gray-500" />
                ) : (
                  <FaPlus className="text-gray-500" />
                )}
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${openIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                  } overflow-hidden`}
              >
                <p className="p-4 sm:p-2 text-gray-600 md:text-lg text-xs">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-blue-50 p-6 rounded-xl sticky top-6">
            <div className="flex items-center mb-4">
              <FaInfoCircle className="text-primary text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                Need Help?
              </h3>
            </div>

            <p className="text-gray-700 mb-6">
              Contact our support team for any additional questions.
            </p>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaPhone className="text-primary" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Call us at</p>
                  <a
                    href={`tel:${kifiyaConstacts.phone}`}
                    className="text-primary font-semibold text-lg hover:underline"
                  >
                    {kifiyaConstacts.phoneFormatted}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-100 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Business Hours</h4>
              <p className="text-gray-700">Monday: Friday: 9am - 5pm</p>
              <p className="text-gray-700">Saturday: 9am - 12pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
