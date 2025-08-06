"use client";

import { ReactNode, useEffect, useState, useRef } from "react";
import Navbar from "./header/NaveBar";
import Image from "next/image";
import Footer from "../footer";
import StepIndicator from "../form/StepIndicator";
import { motion, AnimatePresence } from "framer-motion";

interface HeroContent {
  title: string;
  subtitle: string;
  subtitle2: string;
  image: string;
  cta?: string;
}

interface SplitLayoutProps {
  rightMain: ReactNode;
  centerRightContent?: boolean;
  showHero?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  currentStep?: number;
  totalSteps?: number;
  showStepper?: boolean;
}

const heroContents: HeroContent[] = [
  {
    title: "Welcome back",
    subtitle: "Unlimited products, Innovative platform.",
    subtitle2: "Get your dream device now!",
    image: "login-banner",
    cta: "Explore Devices",
  },
  {
    title: "Upgrade Your Tech",
    subtitle: "Flexible financing made simple.",
    subtitle2: "Own the latest device today!",
    image: "upgrade",
    cta: "View Plans",
  },
  {
    title: "Easy Payment Plans",
    subtitle: "Choose your plan, pay with ease.",
    subtitle2: "No hassle, just enjoy your device.",
    image: "payment",
    cta: "Get Started",
  },
];

export default function SplitLayout({
  rightMain,
  centerRightContent = true,
  showHero = true,
  showHeader = true,
  showFooter = true,
  currentStep = 1,
  totalSteps = 7,
  showStepper = true,
}: SplitLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
    resetTimeout();
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setDirection("right");
      setCurrentIndex((prevIndex) =>
        prevIndex === heroContents.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

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
                {showStepper && (
                  <StepIndicator
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                  />
                )}
              </motion.div>
            </div>
          </div>
        )}

        <main
          className={`flex-grow flex ${
            showFullLayout
              ? "my-20"
              : "items-center justify-center min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-80px)]"
          }`}
        >
          {showFullLayout ? (
            <div className="w-full max-w-6xl max-h-[800px] mx-auto flex flex-col-reverse lg:flex-row bg-[#f6f6f2] rounded-2xl overflow-hidden shadow-lg">
              {showHero && (
                <div className="hidden lg:flex w-full lg:w-[45%] bg-gradient-to-br from-gradient3 to-gradient1 p-8 flex-col justify-center items-center text-center space-y-6 text-white relative overflow-hidden">
                  {/* Animated background elements */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/10"></div>
                  <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white/5"></div>

                  {/* Hero slides container */}
                  <div className="relative w-full h-[400px] max-w-sm mx-auto">
                    <AnimatePresence custom={direction}>
                      <motion.div
                        key={currentIndex}
                        custom={direction}
                        initial={{
                          opacity: 0,
                          x: direction === "right" ? 100 : -100,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: direction === "right" ? -100 : 100,
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0 flex flex-col justify-center items-center px-6 space-y-4 rounded-xl"
                      >
                        <motion.h2
                          className="text-3xl md:text-4xl font-bold leading-tight"
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {heroContents[currentIndex].title}
                        </motion.h2>

                        <motion.p
                          className="text-base md:text-lg text-indigo-100/90"
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {heroContents[currentIndex].subtitle}
                        </motion.p>

                        <motion.p
                          className="text-base md:text-lg font-medium text-white"
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {heroContents[currentIndex].subtitle2}
                        </motion.p>

                        <motion.div
                          className="relative h-52 md:h-64 w-full rounded-xl overflow-hidden mt-4"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Image
                            src={`/${heroContents[currentIndex].image}.png`}
                            alt="banner"
                            fill
                            className="object-contain drop-shadow-lg"
                            priority
                          />
                        </motion.div>

                        {heroContents[currentIndex].cta && (
                          <motion.button
                            className="mt-6 px-8 py-3 bg-white text-gradient1 font-medium rounded-full shadow-lg hover:bg-opacity-90 transition-all"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {heroContents[currentIndex].cta}
                          </motion.button>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex space-x-3 justify-center mt-6">
                    {heroContents.map((_, idx) => (
                      <button
                        key={idx}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === currentIndex
                            ? "w-6 bg-white"
                            : "bg-indigo-300 hover:bg-indigo-400"
                        }`}
                        onClick={() => goToSlide(idx)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div
                className={`w-full lg:w-[55%] flex items-center justify-center px-4 py-8 md:p-12 bg-white ${
                  centerRightContent ? "items-center" : ""
                }`}
              >
                <div className="w-full max-w-md mx-auto">{rightMain}</div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto px-4 py-8">{rightMain}</div>
          )}
        </main>

        {showFooter && <Footer />}
      </div>
    </div>
  );
}
