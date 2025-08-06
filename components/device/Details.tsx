"use client";

import React from "react";

interface Product {
  deviceName: string;
  maximumPrice: number;
  downPayment: number;
  storage: string;
  ram: string;
  batteryCapacity: string;
  cameraQuality: string;
  frontCamera: string;
  processor: string;
  display: string;
  network: string;
  sensors: string;
  deviceOs: string;
}

interface ProductDetailsRightProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsRightProps> = ({ product }) => {
  return (
    <div className="md:w-1/2 md:mt-20 mt-5">
      <h1 className="text-2xl font-bold mb-2">{product?.deviceName}</h1>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm md:max-w-md max-w-full">
        <p className="font-semibold">PRICE :</p>
        <p>{product?.maximumPrice?.toLocaleString()} ETB</p>

        <p className="font-semibold">DOWN PAYMENT :</p>
        <p>
          {product?.downPayment
            ? product.downPayment.toLocaleString() + " ETB"
            : ""}
        </p>

        <p className="font-semibold">STORAGE:</p>
        <p>{product?.storage}</p>

        <p className="font-semibold">RAM:</p>
        <p>{product?.ram}</p>

        <p className="font-semibold">BATTERY:</p>
        <p>{product?.batteryCapacity}</p>

        <p className="font-semibold">MAIN CAMERA:</p>
        <p>{product?.cameraQuality}</p>

        <p className="font-semibold">FRONT CAMERA:</p>
        <p>{product?.cameraQuality}</p>

        <p className="font-semibold">PROCESSOR:</p>
        <p>{product?.processor}</p>

        <p className="font-semibold">DISPLAY:</p>
        <p>{product?.display}</p>

        <p className="font-semibold">NETWORK:</p>
        <p>{product?.network}</p>

        {/* <p className="font-semibold">SENSORS:</p>
        <p>{product.specs.sensors}</p> */}

        <p className="font-semibold">OS:</p>
        <p>{product?.deviceOs}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
