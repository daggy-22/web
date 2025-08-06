import { useState, useEffect, useRef } from "react";

interface AutocompleteProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string, fieldName: string) => void;
  fieldName: string;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: { message: string };
}

export const Autocomplete = ({
  options,
  value,
  onChange,
  fieldName,
  isLoading = false,
  disabled = false,
  placeholder = "",
  error,
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedOption = options?.find((opt) => opt.value === value);
    setInputValue(selectedOption?.label || "");
  }, [value, options]);

  useEffect(() => {
    if (inputValue === "") {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  }, [inputValue, options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);

    if (newValue === "") onChange("", fieldName);
  };

  const handleSelect = (optionValue: string, optionLabel: string) => {
    onChange(optionValue, fieldName);
    setInputValue(optionLabel);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 border border-gray-200 rounded-md text-xs focus:outline-none focus:border-gray-300 ${
          error ? "border-red-500" : ""
        } ${disabled ? "bg-gray-100 text-gray-500" : "bg-white"}`}
      />

      {isLoading && (
        <div className="absolute right-3 top-2.5">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
        </div>
      )}

      {isOpen && !disabled && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-xs shadow-sm border border-gray-200">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value, option.label)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                  value === option.value ? "bg-gray-100" : ""
                }`}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">No records found</li>
          )}
        </ul>
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1 pl-1">{error.message}</p>
      )}
    </div>
  );
};
