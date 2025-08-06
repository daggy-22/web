"use client";

import { ReactNode, useEffect, useState, useRef } from "react";
import Navbar from "./header/NaveBar";
import Footer from "../footer";
import StepIndicator from "../form/StepIndicator";
import { motion } from "framer-motion";

interface HeroContent {
  title: string;
  subtitle: string;
  subtitle2: string;
  image: string;
  cta?: string;
}

interface SplitLayoutProps {
  rightMain: ReactNode;
  showHero?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export default function SplitLayout({
  rightMain,
  showHero = true,
  showHeader = true,
  showFooter = true,
  currentStep = 1,
  totalSteps = 7,
}: SplitLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const showFullLayout = showHeader || showHero;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="md:hidden px-1.5">
        <Navbar />
      </div>

      <div className="flex flex-col flex-grow md:mt-0 mt-20">
        <div className="hidden md:block">
          <Navbar />
        </div>

        {showHeader && (
          <div className="relative w-full h-[180px] md:h-[240px] bg-gradient-to-r from-gradient2 via-gradient3 to-gradient1">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex flex-col items-center justify-center px-6 py-4 md:gap-4 gap-2 text-center text-white">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-bold text-2xl md:text-4xl lg:text-5xl tracking-tight"
              >
                START YOUR DEVICE FINANCING JOURNEY
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm md:text-lg text-indigo-100/90 max-w-2xl"
              >
                Get flexible payment plans and own your device without hassle.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full max-w-4xl px-2 mt-2 md:mt-4"
              >
                <StepIndicator
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                />
              </motion.div>
            </div>
          </div>
        )}

        <main
          className={`flex-grow flex ${
            showFullLayout
              ? ""
              : "items-center justify-center min-h-[calc(100vh-80px)]"
          }`}
        >
          {!showFullLayout ? (
            <></>
          ) : (
            <div className="w-full mx-auto px-4 py-8">{rightMain}</div>
          )}
        </main>

        {showFooter && <Footer />}
      </div>
    </div>
  );
}
