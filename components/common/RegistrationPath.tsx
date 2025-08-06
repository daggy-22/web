"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSelectedThemeStore from "@/stores/themeStore";

interface RegistrationCard {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

const RegistrationPath: React.FC = () => {
  const { theme } = useSelectedThemeStore((state) => state);
  const [cards, setCards] = useState<RegistrationCard[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/registrationPaths");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="flex justify-center my-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="shadow-lg rounded-xl p-6 text-center flex flex-col h-full"
          >
            <div className="flex-grow">
              <h3 className="md:text-lg text-md font-semibold mb-2">
                {card.title}
              </h3>
              <p className="md:text-sm text-xs font-normal">
                {card.description}
              </p>
            </div>
            <button
              className={`${
                theme === "dark" ? "bg-gray-500" : "bg-primary text-white"
              } mt-5 md:text-sm text-xs md:py-4 py-2 w-full md:rounded-xl rounded-lg hover:opacity-90 cursor-pointer`}
              onClick={() => router.push(card.link)}
            >
              {card.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationPath;
