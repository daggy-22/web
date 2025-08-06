"use client";

import SetPassword from "@/components/auth/SetPassword";
import SplitLayout from "@/components/ui/SplitLayout";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function SetNewPasswordContent() {
  const searchParams = useSearchParams();
  const [showStepper, setShowStepper] = useState(true);
  const [fromReset, setFromReset] = useState(false);

  useEffect(() => {
    const stepperValue = searchParams.get("showStepper");
    const resetValue = searchParams.get("reset");
    setShowStepper(stepperValue !== "false"); // Default to true unless explicitly false
    setFromReset(resetValue === "true");
  }, [searchParams]);

  return (
    <SplitLayout
      showStepper={showStepper}
      showHeader={showStepper}
      showHero={showStepper} // Show hero section when stepper is visible
      currentStep={3}
      totalSteps={11}
      rightMain={<SetPassword fromReset={fromReset} />}
    />
  );
}

export default function SetNewPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetNewPasswordContent />
    </Suspense>
  );
}
