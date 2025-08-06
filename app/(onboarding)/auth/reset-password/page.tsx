"use client";

import SetPassword from "@/components/auth/ResetPassword";
import SplitLayout from "@/components/ui/SplitLayout";

export default function SetNewPassword() {
  return <SplitLayout showStepper={false} rightMain={<SetPassword />} />;
}
