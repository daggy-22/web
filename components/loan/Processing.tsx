import { FaSpinner } from "react-icons/fa";

const ProcessingLoan = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4 flex flex-col items-center">
        <FaSpinner className="animate-spin h-12 w-12 text-gray-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Processing Your Loan Application
        </h2>
        <p className="text-gray-600 t ext-center">
          We&apos;re reviewing your details. Please wait...
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
          <div 
            className="bg-gray-600 h-2 rounded-full" 
            style={{
              width: '70%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingLoan
