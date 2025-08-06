import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

type StepIndicatorProps = {
  totalSteps: number;
  currentStep: number;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
}) => {
  const [prevStep, setPrevStep] = useState(currentStep);

  useEffect(() => {
    if (prevStep !== currentStep) {
      setPrevStep(currentStep);
    }
  }, [currentStep, prevStep]);

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="flex items-center justify-center min-w-max bg-gray-50 h-10 px-4 rounded-2xl shadow-sm mx-auto">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className="flex items-center">
              <div
                className={`md:w-6 md:h-6 h-4 w-4 flex items-center justify-center rounded-full text-xs font-medium
                  transition-all duration-300 ease-in-out transform
                  ${
                    isCompleted
                      ? "bg-primary scale-110 text-white shadow-md"
                      : isActive
                      ? "bg-[#2C3E50] scale-110 text-white shadow-md"
                      : "bg-gray-200 scale-95 text-gray-500"
                  }`}
              >
                {isCompleted ? (
                  <AiOutlineCheck className="text-white text-xs" />
                ) : (
                  index + 1
                )}
              </div>
              {index < totalSteps - 1 && (
                <div className="md:w-8 w-4 h-1 mx-1 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-in-out
                      ${
                        isCompleted
                          ? "bg-primary"
                          : isActive
                          ? "bg-[#2C3E50]"
                          : "bg-gray-200"
                      }`}
                    style={{
                      width: isCompleted ? "100%" : isActive ? "75%" : "0%",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;