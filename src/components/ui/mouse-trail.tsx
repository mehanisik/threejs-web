import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

export const MouseTrail = () => {
  const mousePosition = useMousePosition();
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const animationId = useRef<number>(0);

  useEffect(() => {
    let lastTime = 0;
    const targetInterval = 1000 / 240;

    const addTrailPoint = (currentTime: DOMHighResTimeStamp) => {
      if (currentTime - lastTime >= targetInterval) {
        const newPoint: TrailPoint = {
          x: mousePosition.x,
          y: mousePosition.y,
          timestamp: currentTime,
        };

        setTrail((prevTrail) => {
          const newTrail = [newPoint, ...prevTrail];
          const cutoffTime = currentTime - 400;
          return newTrail.filter((point) => point.timestamp > cutoffTime);
        });

        lastTime = currentTime;
      }

      animationId.current = requestAnimationFrame(addTrailPoint);
    };

    animationId.current = requestAnimationFrame(addTrailPoint);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [mousePosition.x, mousePosition.y]);

  const createSmoothPath = (points: TrailPoint[]): string => {
    if (points.length < 2) return "";

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;

      if (i === 1) {
        path += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
      } else {
        path += ` T ${midX} ${midY}`;
      }
    }

    return path;
  };

  const pathData = createSmoothPath(trail);

  const neonWhiteColors = {
    start: "rgba(255, 255, 255, 0.3)",
    middle: "rgba(255, 255, 255, 0.6)",
    end: "rgba(255, 255, 255, 0.9)",
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      <svg className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={neonWhiteColors.start} />
            <stop offset="50%" stopColor={neonWhiteColors.middle} />
            <stop offset="100%" stopColor={neonWhiteColors.end} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {pathData && (
          <motion.path
            d={pathData}
            stroke="url(#trailGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.05, ease: "easeOut" },
              opacity: { duration: 0.05 },
            }}
          />
        )}

        {pathData && (
          <motion.path
            d={pathData}
            stroke="url(#trailGradient)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              pathLength: { duration: 0.05, ease: "easeOut" },
            }}
          />
        )}
      </svg>
    </div>
  );
};
