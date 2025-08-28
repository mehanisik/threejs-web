import type { ReactNode } from "react";
import type { HelmetServerState } from "react-helmet-async";
import { HelmetProvider } from "react-helmet-async";

interface SEOProviderProps {
  children: ReactNode;
  helmetContext?: { helmet?: HelmetServerState };
}

export const SEOProvider = ({ children, helmetContext }: SEOProviderProps) => {
  return <HelmetProvider context={helmetContext}>{children}</HelmetProvider>;
};
