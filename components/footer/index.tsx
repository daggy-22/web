"use client";

import { kifiyaConstacts } from "@/config/config";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={`mt-10 bg-footerBg w-full text-white py-8`}>
      <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
        <div className="flex md:flex-row flex-col justify-between md: gap-4 gap-2 items-center">
          <div>
            <img src="/svg/footer-logo.svg" alt="logo" className="w-32 h-32" />
            <p className="text-gray-500 md:max-w-xs max-w-full md:-mt-2">
              We have electronic devices that suits your style and which you're
              proud to use. For all kinds of users.
            </p>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap gap-6 mt-8 text-gray-400 text-sm">
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-white font-medium">About Kifiya</h3>
              <p className="mt-2 text-gray-100">
                Empowering digital access through innovative device financing
                solutions.
              </p>
            </div>

            <div className="flex-1 min-w-[200px]">
              <h3 className="text-white font-medium">Quick Links</h3>
              <ul className="mt-2 space-y-1 text-gray-100">
                <li>
                  <Link href="/products" className="hover:underline">
                    Devices
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Partners
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex-1 min-w-[200px]">
              <h3 className="text-white font-medium">Resources</h3>
              <ul className="mt-2 space-y-1 text-gray-100">
                <li>
                  <a href="#" className="hover:underline">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex-1 min-w-[200px]">
              <h3 className="text-white font-medium">Contact Us</h3>
              <ul className="mt-2 space-y-1 text-gray-100">
                <li>
                  <a href={`tel:${kifiyaConstacts.phone}`}>
                    {kifiyaConstacts.phoneFormatted}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${kifiyaConstacts.email}`}>
                    {kifiyaConstacts.email}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps?q=Addis+Ababa,+Ethiopia"
                    target="_blank"
                  >
                    Addis Ababa, Ethiopia
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-100 text-xs mt-6">
          © {currentYear || ""} Kifiya Device Financing. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
