import LoginComponent from "@/components/login/Login";
import SplitLayout from "@/components/ui/SplitLayout";

export default function LoginPage() {
  return <SplitLayout rightMain={<LoginComponent />} showHeader={false} />;
}
