"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/ui/header/HeroSection";
import { appFaq, dummySuggestions } from "@/config/config";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedDevices } from "@/libs/api";
import Navbar from "@/components/ui/header/NaveBar";
import Footer from "@/components/footer";
import { ImSpinner2 } from "react-icons/im";
import { Device } from "@/libs/interfaces";
import useSelectedThemeStore from "@/stores/themeStore";
import { getThemeClasses } from "@/utils/helper";

const NearYouHeader = dynamic(() => import("@/components/device/NearYou"), {
  ssr: false,
});
const DeviceCard = dynamic(() => import("@/components/device/DeviceCard"), {
  ssr: false,
});
const SearchBar = dynamic(() => import("@/components/merchant/Search"), {
  ssr: false,
});
const MapView = dynamic(() => import("@/components/merchant/MapView"), {
  ssr: false,
});
const CenteredHeader = dynamic(
  () => import("@/components/common/CenteredHeader"),
  { ssr: false }
);
const RegistrationPath = dynamic(
  () => import("@/components/common/RegistrationPath"),
  { ssr: false }
);
const CustomerHow = dynamic(() => import("@/components/common/CustomerHow"), {
  ssr: false,
});
const MerchantHow = dynamic(() => import("@/components/common/MerchantHow"), {
  ssr: false,
});
const WhyKifiya = dynamic(() => import("@/components/common/WhyKifiya"), {
  ssr: false,
});
const FAQ = dynamic(() => import("@/components/common/Faq"), { ssr: false });
const PartnerWithKifiya = dynamic(
  () => import("@/components/common/PartnerWthKifiya"),
  { ssr: false }
);

export default function Home() {
  const { theme } = useSelectedThemeStore((state) => state);
  const {
    data: featuredDevices = [],
    isLoading,
    isError,
  } = useQuery<Device[]>({
    queryKey: ["featuredDevices"],
    queryFn: fetchFeaturedDevices,
  });

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || featuredDevices.length === 0) return;

    let scrollInterval: NodeJS.Timeout | null = null;
    let direction: "right" | "left" = "right";
    const scrollStep = 0.5;

    const startScrolling = () => {
      if (scrollInterval) return; // avoid multiple intervals
      scrollInterval = setInterval(() => {
        if (!scrollContainer) return;

        if (direction === "right") {
          if (
            scrollContainer.scrollLeft + scrollContainer.clientWidth >=
            scrollContainer.scrollWidth
          ) {
            direction = "left";
          } else {
            scrollContainer.scrollLeft += scrollStep;
          }
        } else {
          if (scrollContainer.scrollLeft <= 0) {
            direction = "right";
          } else {
            scrollContainer.scrollLeft -= scrollStep;
          }
        }
      }, 16); // ~60fps
    };

    const stopScrolling = () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }
    };

    startScrolling();

    scrollContainer.addEventListener("mouseenter", stopScrolling);
    scrollContainer.addEventListener("touchstart", stopScrolling);
    scrollContainer.addEventListener("mouseleave", startScrolling);
    scrollContainer.addEventListener("touchend", startScrolling);

    return () => {
      stopScrolling();
      scrollContainer.removeEventListener("mouseenter", stopScrolling);
      scrollContainer.removeEventListener("touchstart", stopScrolling);
      scrollContainer.removeEventListener("mouseleave", startScrolling);
      scrollContainer.removeEventListener("touchend", startScrolling);
    };
  }, [featuredDevices]);

  return (
    <div className={`${getThemeClasses(theme)}`}>
      <Navbar />
      <div className="flex flex-col gap-6">
        <div className="md:p-10 p-5">
          <HeroSection />
        </div>

        {!isLoading && !isError && (
          <p className="text-lg md:text-2xl font-bold md:leading-10 text-center">
            Devices Available for Financing
          </p>
        )}

        <div className="flex justify-center md:text-sm text-xs px-4 md:px-10 mt-2">
          {isLoading ? (
            <ImSpinner2 className="text-gray-800 text-2xl animate-spin" />
          ) : isError ? null : (
            <div
              ref={scrollContainerRef}
              className="w-full flex gap-4 overflow-x-auto px-4 pb-6 scroll-smooth scrollbar-hide"
            >
              {featuredDevices.map((device) => (
                <div
                  key={device.id}
                  className="flex-shrink-0 w-[85vw] sm:w-[320px] md:w-[400px] px-2"
                >
                  <DeviceCard device={device} isOnHomePage />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col -space-y-3 md:space-y-0">
          <NearYouHeader />
          <SearchBar
            suggestions={dummySuggestions}
            value=""
            onChange={() => {}}
            onSelect={() => {}}
          />
        </div>

        <MapView />

        <div className="flex flex-col -space-y-3 md:space-y-0">
          <CenteredHeader text="Choose Your Registration Path" />
          <RegistrationPath />
        </div>

        <div className="flex flex-col -space-y-3 md:space-y-0">
          <CenteredHeader text="How It Works For Customers" />
          <CustomerHow />
        </div>

        <div className="flex flex-col -space-y-3 md:space-y-0">
          <CenteredHeader text="How It Works For Merchants" />
          <MerchantHow />
        </div>

        <div className="flex flex-col -space-y-3 md:space-y-0">
          <CenteredHeader text="Partner With Kifiya?" />
          <PartnerWithKifiya />
        </div>

        <div className="flex flex-col -space-y-3 md:space-y-0">
          <CenteredHeader text="Why Choose Kifiya?" />
          <WhyKifiya />
        </div>

        <div className="flex flex-col -space-y-3 md:space-y-0">
          <FAQ faqs={appFaq} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
