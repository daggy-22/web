"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/header/NaveBar";
import Footer from "@/components/footer";
import useSelectedThemeStore from "@/stores/themeStore";
import { getThemeClasses } from "@/utils/helper";
import { termsConfig } from "@/config/terms.config";
import { FiChevronLeft } from "react-icons/fi";

export default function TermsPage() {
  const router = useRouter();
  const { theme } = useSelectedThemeStore((state) => state);

  const renderContent = (content: any, subContent?: any) => {
    if (typeof content === "string") {
      return <p className="text-gray-700 mb-4">{content}</p>;
    }

    if (Array.isArray(content)) {
      return (
        <div className="space-y-2 mb-4">
          {content.map((item, index) => (
            <p key={index} className="text-gray-700">
              {item}
            </p>
          ))}
        </div>
      );
    }

    if (typeof content === "object") {
      return (
        <div className="text-gray-700 space-y-3 mb-4">
          {Object.entries(content).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {String(value)}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderSubContent = (subContent: any) => {
    if (!subContent) return null;

    return (
      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        {subContent.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className={`${getThemeClasses(theme)}`}>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 max-w-4xl mx-auto px-6 py-8">
          <button
            onClick={handleBack}
            className="mb-6 inline-flex items-center p-2 bg-gray-400 rounded-lg text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Go back"
          >
            <FiChevronLeft className="h-6 w-6" />
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {termsConfig.title}
            </h1>

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  <strong>Last updated:</strong> {termsConfig.lastUpdated}
                </p>

                <div className="space-y-6">
                  {termsConfig.sections.map((section) => (
                    <section key={section.id}>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        {section.title}
                      </h2>
                      {renderContent(section.content)}
                      {renderSubContent(section.subContent)}
                    </section>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Company Information
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <strong>Company:</strong> {termsConfig.companyInfo.name}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {termsConfig.companyInfo.address}
                    </p>
                    <p>
                      <strong>{termsConfig.companyInfo.tin}</strong>
                    </p>
                    <p>
                      <strong>{termsConfig.companyInfo.principalReg}</strong>
                    </p>
                    <p>
                      <strong>{termsConfig.companyInfo.businessLicense}</strong>
                    </p>
                    <p>
                      <strong>Email:</strong> {termsConfig.companyInfo.email}
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> {termsConfig.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
