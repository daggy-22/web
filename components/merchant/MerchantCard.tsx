import React from "react";
import Link from "next/link";
// import { getMerchantImageUrl } from "@/utils/helper";

interface MerchantCardProps {
  merchant: {
    id: string;
    imageUrl: string;
    name: string;
    // location: string;
  };
}

export default function MerchantCard({ merchant }: MerchantCardProps) {
  const { id, name } = merchant;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between">
      <Link href={`/merchants/${id}`}>
        <img
          // src={getMerchantImageUrl(id)}
          src="/shop.png"
          alt={name}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h3 className="md:text-xl text-lg font-bold mb-1 text-black">{name}</h3>
        <p className="md:text-md text-sm text-gray-600">
          <span className="font-bold text-black">Location:</span> Bole Atlas
        </p>
      </Link>
    </div>
  );
}
