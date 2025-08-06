import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  onSelect: (selected: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, suggestions, onSelect }) => {
  const showSuggestions = value?.length > 0;

  return (
    <div className="relative w-full max-w-screen-lg mx-auto p-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
          className="bg-[#EFF0F1] w-full py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 md:py-5 md:px-6 md:rounded-2xl md:text-lg text-sm"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 md:right-4 md:text-xl text-lg" />
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div className="mt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-full max-w-screen-lg mx-auto">
          {suggestions
            .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
            .map((suggestion, index) => (
              <div
                key={index}
                className="py-2 px-6 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelect(suggestion);
                  onChange(""); // Clear input after selection
                }}
              >
                {suggestion}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
