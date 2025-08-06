import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type PaginationIndicatorProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

const PaginationIndicator: React.FC<PaginationIndicatorProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const getPaginationItems = (): (number | string)[] => {
    const paginationItems: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(i);
      }
    } else {
      paginationItems.push(1);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      if (startPage > 2) {
        paginationItems.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(i);
      }

      if (endPage < totalPages - 1) {
        paginationItems.push("...");
      }
      paginationItems.push(totalPages);
    }

    return paginationItems;
  };

  return (
    <div className="w-full flex justify-end space-x-2 py-4 bg-white">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-2 py-1 border rounded-md ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "bg-gray-300 text-white border-gray-300 hover:bg-gray-400"
        }`}
      >
        <FaArrowLeft />
      </button>

      {getPaginationItems().map((item, index) => {
        if (item === "...") {
          return (
            <span key={index} className="px-2 py-1 text-gray-500">
              {item}
            </span>
          );
        }

        return (
          <button
            key={item}
            onClick={() => handlePageClick(item as number)}
            className={`px-4 py-1 border rounded-md ${
              currentPage === item
                ? "bg-gray-800 text-white border-gray-300"
                : "text-gray-500 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 border rounded-md ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-400"
        }`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default PaginationIndicator;
