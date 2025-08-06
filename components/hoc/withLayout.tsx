/* eslint-disable @typescript-eslint/no-explicit-any */

import Navbar from "@/components/ui/header/NaveBar";
import Footer from "../footer";

const withLayout = (Component: React.ComponentType, includeLayout: boolean) => {
  const WrappedComponent = (props: any) => (
    <>
      {includeLayout && <Navbar />}
      <Component {...props} />
      {includeLayout && <Footer />}
    </>
  );

  WrappedComponent.displayName = `WithLayout(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};

export default withLayout;
