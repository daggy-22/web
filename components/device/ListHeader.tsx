//import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface DeviceListHeaderProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentPage?: number;
  maxPages?: number;
}

const DeviceListHeader: React.FC<DeviceListHeaderProps> = () => {
  return (
    <div className="flex justify-center my-5">
      <div className="bg-white mt-5 text-black flex flex-col justify-center md:w-4/5 w-5/6">
        <div className="flex justify-between items-center">
          <p className="text-lg md:text-2xl font-bold md:leading-10 text-center">
            Devices Available for Financing
          </p>
          <div className="flex gap-2">
            {/* <button
              className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${
                currentPage > 1 ? "bg-black text-white" : "border-black text-black opacity-50 cursor-not-allowed"
              }`}
              onClick={onPrev}
              disabled={currentPage <= 1}
            >
              <FiArrowLeft size={20} />
            </button>
            <button
              className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${
                currentPage < maxPages
                  ? "bg-black text-white"
                  : "border-black text-black opacity-50 cursor-not-allowed"
              }`}
              onClick={onNext}
              disabled={currentPage >= maxPages}
            >
              <FiArrowRight size={20} />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceListHeader;
