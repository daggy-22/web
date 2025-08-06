import InitiateComponent from "@/components/initiate/Initate";
import SplitLayout from "@/components/ui/SplitLayout";

export default function InitialteOnboardingPage() {
  return (
    <SplitLayout
      showStepper={true}
      showHeader={true}
      showHero={true}
      currentStep={4}
      totalSteps={11}
      rightMain={<InitiateComponent />}
    />
  );
}
