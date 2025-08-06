"use client";

import React, { useState } from "react";
import SignUpComponent from "@/components/signup/SignUp";
import SplitLayout from "@/components/ui/SplitLayout";

export default function RegisterPage() {
  const [pageStep, setPageStep] = useState<number>(1);

  return (
    <SplitLayout
      currentStep={pageStep}
      totalSteps={11}
      rightMain={
        <SignUpComponent currentStep={pageStep} onStepChange={setPageStep} />
      }
    />
  );
}
