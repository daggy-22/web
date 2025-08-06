import React, { useState } from "react";

interface MerchantSearchProps {
  onSearch?: (location: string) => void;
  placeholder?: string;
  buttonText?: string;
}

const MerchantSearch: React.FC<MerchantSearchProps> = ({
  // onSearch,
  placeholder = "Enter your location",
  buttonText = "Search",
}) => {
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // onSearch(location);
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg">
      <h2 className="md:text-2xl text-lg font-bold text-center mb-2">
        Find a Merchant Near You
      </h2>
      <p className="md:text-sm text-xs text-gray-600 text-center mb-4">
        Enter your location to search for merchants near your location
      </p>
      <form
        onSubmit={handleSearch}
        className="bg-white shadow-md md:p-5 p-2 rounded-2xl md:min-w-[500px] min-w-fit flex flex-col space-y-2"
      >
        <label
          htmlFor="merchant-search"
          className="text-black font-medium md:text-sm text-xs"
        >
          Search
        </label>
        <input
          type="text"
          id="merchant-search"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 md:text-sm text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 md:text bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default MerchantSearch;
