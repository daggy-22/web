"use client";

import { appTheme } from "@/config/config";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const isDark = false;
  return (
    <div
      className={`hero min-h-[500px] rounded-xl p-5 ${isDark
          ? "bg-dark text-gray-300"
          : "text-white bg-gradient-to-br from-gradient1 via-gradient2 to-gradient3"
        }`}
    >
      <div className="hero-content flex flex-col lg:flex-row items-center gap-8">
        <div className="lg:w-1/2 w-full">
          <h1 className="md:text-5xl text-2xl font-bold">
            Buy your device now on credit directly from here
          </h1>
          <p className="py-6 max-w-md">
            Flexible plans, instant approvals, and seamless transactions—all in
            one platform.
          </p>
          <div className="flex items-center gap-2 cursor-pointer">
            <b>Know More</b>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
          <div className="flex md:flex-row flex-col gap-4 py-4 mt-5">
            <Link href="/register">
              <button
                style={{
                  backgroundColor: appTheme.primaryBgColor,
                }}
                className="btn btn-primaryBtn hover:bg-slate-500 border-none md:py-3 py-1.5 text-white"
              >
                Apply for Financing
              </button>
            </Link>
            <Link href="#">
              <button className="hover:opacity-50 border-none md:py-3 py-1.5 text-white">
                Register as a merchant &rarr;
              </button>
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 w-full relative h-[250px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
          <Image
            src="/banner.png"
            alt="product banner"
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
