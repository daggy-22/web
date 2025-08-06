"use client";

import React from "react";

interface InputFiledProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

const InputFiled: React.FC<InputFiledProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  error,
  required,
  icon,
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      <span className={`absolute right-3 ${error ? 'top-1/2' : 'top-2/3'} -translate-y-1/2 text-gray-500`}>{icon && icon}</span>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputFiled;