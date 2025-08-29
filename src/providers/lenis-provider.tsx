import { useRouterState } from "@tanstack/react-router";
import { cancelFrame, frame } from "framer-motion";
import { type LenisRef, ReactLenis } from "lenis/react";
import { type ReactNode, useEffect, useRef } from "react";

export interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<LenisRef>(null);
  const locationKey = useRouterState({
    select: (s) =>
      `${s.location.pathname}${s.location.search}${s.location.hash}`,
  });

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  // Reset scroll position on route changes
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      // Reset Lenis scroll position
      lenis.scrollTo(0, { immediate: true });
    }
    // Also reset window scroll as fallback
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [locationKey]);

  return (
    <ReactLenis root ref={lenisRef}>
      {children}
    </ReactLenis>
  );
};
