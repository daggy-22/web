"use client";

import { useState, useEffect, useRef } from "react";
import useCustomerStore from "@/stores/customerStore";
import useUserStore from "@/stores/userStore";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "../ThemeSwitcher";
import { useRouter, usePathname } from "next/navigation";
import useCustomerProfileStore from "@/stores/customerProfileStore";
import useSelectedThemeStore from "@/stores/themeStore";
import { getThemeClasses } from "@/utils/helper";

export default function Navbar() {
  const { theme } = useSelectedThemeStore((state) => state);
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const clearUser = useUserStore((state) => state.clearUser);
  const { profile, clearProfile } = useCustomerProfileStore((state) => state);
  const customer = useCustomerStore((state) => state.customer);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const togglePopover = () => {
    setTimeout(() => {
      setIsPopoverOpen((prev) => !prev);
    }, 0);
  };


  const handleSignOut = () => {
    clearUser();
    clearProfile();
    router.push("/login");
    // setTimeout(() => setIsPopoverOpen(false), 100);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <nav className={`w-full shadow-md z-50 relative ${getThemeClasses(theme)}`}>
      <div className="navbar container mx-auto px-4 py-2 hidden lg:flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <Image src="/svg/logo.svg" alt="Logo" width={150} height={150} />
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link
            href="/"
            className={`hover:text-gray-600 px-4 py-2 rounded-lg ${isActive("/")
              ? `${isDark ? "bg-gray-200 text-gray-800" : "bg-gray-200"}`
              : ""
              }`}
          >
            HOME
          </Link>
          {profile && (
            <Link
              href="/merchants"
              className={`hover:text-gray-600 px-4 py-2 rounded-lg ${isActive("/merchants")
                ? `${isDark ? "bg-gray-200 text-gray-800" : "bg-gray-200"}`
                : ""
                }`}
            >
              MERCHANTS
            </Link>
          )}
          {profile && (
            <Link
              href="/products"
              className={`hover:text-gray-600 px-4 py-2 rounded-lg ${isActive("/products")
                ? `${isDark ? "bg-gray-200 text-gray-800" : "bg-gray-200"}`
                : ""
                }`}
            >
              DEVICES
            </Link>
          )}
          {!profile && (
            <Link
              href="/login"
              className={`hover:text-gray-600 px-4 py-2 rounded-lg ${isActive("/login")
                ? `${isDark ? "bg-gray-200 text-gray-800" : "bg-gray-200"}`
                : ""
                }`}
            >
              LOGIN
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          {profile ? (
            <div className="relative" ref={popoverRef}>
              <button
                onClick={togglePopover}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-lg italic">
                    {(profile?.firstName?.charAt(0) ?? "?") +
                      (profile?.lastName?.charAt(0) ?? "?")}
                  </span>
                </div>
              </button>
              {isPopoverOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-2xl z-50">
                  <div className="absolute -top-2 right-5 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>
                  <div className="p-4 text-center">
                    <p className="text-sm font-medium text-gray-900">
                      {profile.firstName} {profile.middleName} {profile.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {profile.mobileNumber}
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden md:inline-block border border-primary text-primary py-2 px-4 rounded-full hover:opacity-90"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hidden md:inline-block bg-primary text-white py-2 px-4 rounded-full hover:opacity-90"
              >
                Sign Up Now →
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navbar (small screens) */}
      <div className="navbar flex lg:hidden px-4 py-2 justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <Image src="/svg/logo.svg" alt="Logo" width={100} height={100} />
        </Link>

        <div className="flex items-center gap-4">
          {profile ? (
            <div className="relative" ref={popoverRef}>
              <button
                onClick={togglePopover}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-xs italic">
                    {profile.firstName?.charAt(0)}
                  </span>
                </div>
              </button>
              {isPopoverOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-2xl z-50">
                  <div className="absolute -top-2 right-5 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>
                  <div className="p-4 text-center">
                    <p className="text-sm font-medium text-gray-900">
                      {profile.firstName} {profile.middleName}{" "}
                      {profile.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {profile.mobileNumber}
                    </p>
                  </div>
                  <div className="border-t border-gray-200">

                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="border border-primary text-primary py-2 px-4 rounded-full hover:opacity-90 text-sm"
              >
                Login
              </Link>
            </>
          )}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="btn btn-ghost"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`
          fixed top-0 left-0 w-screen h-screen
          flex flex-col items-center justify-center
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
          lg:hidden
          z-40 ${getThemeClasses(theme)}
        `}
      >
        <div className="absolute top-4 right-4">
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="menu flex flex-col items-center gap-8 text-xl">
          <li>
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`px-4 py-2 rounded-lg ${isActive("/")
                ? `${isDark ? "bg-gray-200 text-gray-800" : "bg-gray-200"}`
                : ""
                }`}
            >
              Home
            </Link>
          </li>
          {profile && (
            <li>
              <Link
                href="/merchants"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg ${isActive("/merchants")
                  ? `${isDark ? "bg-gray-200 text-gray-800" : "bg-gray-200"}`
                  : ""
                  }`}
              >
                Merchants
              </Link>
            </li>
          )}
          {profile && (
            <li>
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg ${isActive("/products")
                  ? `${isDark ? "bg-gray-200 text-gray-800" : "bg-gray-200"}`
                  : ""
                  }`}
              >
                Devices
              </Link>
            </li>
          )}
          {!profile && (
            <li>
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg ${isActive("/login")
                  ? `${isDark ? "bg-gray-200 text-gray-800" : "bg-gray-200"}`
                  : ""
                  }`}
              >
                Login
              </Link>
            </li>
          )}
          {!profile && (
            <li>
              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg bg-primary text-white ${isActive("/register")
                  ? `${isDark ? "bg-gray-200 text-gray-800" : "bg-gray-200"}`
                  : ""
                  }`}
              >
                Sign Up
              </Link>
            </li>
          )}

          {profile && (
            <li>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 rounded-lg text-red-600"
              >
                Sign Out
              </button>
            </li>
          )}
        </ul>

        <div className="mt-10">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
