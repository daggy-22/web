/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import SplitLayout from "@/components/ui/SplitLayout";
import useCustomerProfileStore, {
  Profile,
} from "@/stores/customerProfileStore";
//import { submitOnboarding } from "@/libs/api";
//import useCustomerIdStore from "@/stores/customerIdStore";
import useNationalIdDataStore from "@/stores/nationalIdDataStore";
import { constructInitialValues } from "@/utils/helper";
//import { constructOnboardingPayload, clearNullValues, constructInitialValues } from "@/utils/helper";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
//import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MultiStepForm = dynamic(
  () => import("../../../components/common/FormBuilder"),
  {
    ssr: false,
  }
);

export default function OnboardingPage() {
  const router = useRouter();
  const idData = useNationalIdDataStore((state) => state.idData);
  const { setProfile } = useCustomerProfileStore((state) => state);
  //const clearIdData = useNationalIdDataStore((state) => state.clearIdData);
  // const id = useCustomerIdStore((state) => state.id);

  const totalSteps = 7;

  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (step: number) => {
    if (step > totalSteps) return;
    setCurrentStep(step);
  };

  const onAfterSubmit = (data: unknown) => {
    try {
      toast.success("Profile successfully updated");
      setProfile(data as Profile);
      router.push("/financing/");
    } catch (e) {
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  return (
    <SplitLayout
      showStepper={true}
      showHeader={true}
      showHero={true}
      rightMain={
        <MultiStepForm
          onAfterSubmit={onAfterSubmit}
          initialValues={constructInitialValues(idData)}
          onStepChange={handleStepChange}
        />
      }
      totalSteps={11}
      currentStep={currentStep + 5}
    />
  );
}
