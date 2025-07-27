import { useEffect, useRef } from "react";

interface LiveRegionProps {
  children: React.ReactNode;
  "aria-live"?: "polite" | "assertive" | "off";
  "aria-atomic"?: boolean;
  "aria-relevant"?: "additions" | "removals" | "text" | "all";
  className?: string;
}

export const LiveRegion = ({
  children,
  "aria-live": ariaLive = "polite",
  "aria-atomic": ariaAtomic = true,
  "aria-relevant": ariaRelevant = "all",
  className = "",
}: LiveRegionProps) => {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (regionRef.current && children) {
      const region = regionRef.current;
      region.setAttribute("aria-hidden", "true");
      setTimeout(() => {
        region.removeAttribute("aria-hidden");
      }, 100);
    }
  }, [children]);

  return (
    <div
      ref={regionRef}
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
      aria-relevant={ariaRelevant}
      className={`sr-only ${className}`}
    >
      {children}
    </div>
  );
};
