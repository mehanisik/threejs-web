import { cancelFrame, frame } from "framer-motion";
import { type LenisRef, ReactLenis } from "lenis/react";
import { type ReactNode, useEffect, useRef } from "react";

export interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis root ref={lenisRef}>
      {children}
    </ReactLenis>
  );
};
