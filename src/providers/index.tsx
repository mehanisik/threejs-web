import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { CookiesProvider } from "react-cookie";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { AudioButton } from "@/components/ui/audio-button";
import { MouseTrail } from "@/components/ui/mouse-trail";
import { Toaster } from "@/components/ui/sonner";
import TanStackQueryDevtools from "../integrations/devtools";
import { LenisProvider } from "./lenis-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <LenisProvider>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <AudioButton />
        <ThemeSwitcher />
        <MouseTrail />
        <Toaster richColors />
      </CookiesProvider>
    </LenisProvider>
  );
};
