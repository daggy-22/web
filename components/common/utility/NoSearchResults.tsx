import { FaSearch } from "react-icons/fa";

const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-500">
      <FaSearch className="md:text-6xl text-3xl mb-4" />
      <p className="md:text-md text-sm font-semibold">No Matches Found</p>
      <p className="md:text-sm text-xs">
        Try adjusting your search or filters.
      </p>
    </div>
  );
};

export default NoResults;
