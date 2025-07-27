import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { MouseTrail } from "@/components/ui/mouse-trail";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./auth-provider";
import { LenisProvider } from "./lenis-provider";

export const Providers = ({
  children,
  helmetContext,
}: {
  children: React.ReactNode;
  helmetContext?: { helmet?: HelmetServerState };
}) => {
  return (
    <>
      <MouseTrail />
      <HelmetProvider context={helmetContext}>
        <AuthProvider>
          <LenisProvider>
            {children}
            <Toaster />
          </LenisProvider>
        </AuthProvider>
      </HelmetProvider>
    </>
  );
};
