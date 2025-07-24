import { LoaderPinwheel, Palette } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { themes } from "@/constants/themes";
import { useTheme } from "@/hooks/use-theme";
import type { ThemeName } from "@/types/theme";

interface WheelSegment {
  id: ThemeName;
  text: string;
  color: string;
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useTheme();
  const [segments] = useState<WheelSegment[]>(
    themes.map((t) => ({
      id: t.value,
      text: t.label,
      color: t.color,
    })),
  );

  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const spinWheel = () => {
    if (isSpinning || segments.length === 0) return;

    setIsSpinning(true);

    const spinAmount = Math.random() * 360 + 2400;
    const newRotation = rotation + spinAmount;
    setRotation(newRotation);

    setTimeout(() => {
      const segmentAngle = 360 / segments.length;
      const normalizedRotation = newRotation % 360;
      const pointerAngle = 0;
      const adjustedAngle = (360 - normalizedRotation + pointerAngle) % 360;
      const winnerIndex =
        Math.floor(adjustedAngle / segmentAngle) % segments.length;

      const winnerSegment = segments[winnerIndex];
      setTheme(winnerSegment.id);
      toast.success(`Theme set to ${winnerSegment.text}`);

      setIsSpinning(false);
    }, 4000);
  };

  const handleSegmentClick = (segment: WheelSegment) => {
    if (!isSpinning) {
      setTheme(segment.id);
    }
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const segmentAngle = 360 / segments.length;

  return (
    <div className="relative">
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
        {isExpanded && (
          <div className="mb-4 relative">
            <div className="relative bg-background/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-border/20">
              <div className="relative flex flex-col items-center space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-foreground">
                    Switch Theme
                  </h2>
                </div>

                <div className="relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 z-20">
                    <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-primary" />
                  </div>

                  <div
                    className="relative w-64 h-64 rounded-full border border-border/20 overflow-hidden"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition:
                        "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                  >
                    <svg
                      width="256"
                      height="256"
                      className="w-full h-full"
                      role="img"
                      aria-label="Theme selection wheel"
                    >
                      {segments.map((segment, index) => {
                        const startAngle = index * segmentAngle;
                        const endAngle = (index + 1) * segmentAngle;
                        const midAngle = (startAngle + endAngle) / 2;

                        const radius = 128;
                        const centerX = 128;
                        const centerY = 128;

                        const x1 =
                          centerX +
                          Math.cos(((startAngle - 90) * Math.PI) / 180) *
                            radius;
                        const y1 =
                          centerY +
                          Math.sin(((startAngle - 90) * Math.PI) / 180) *
                            radius;
                        const x2 =
                          centerX +
                          Math.cos(((endAngle - 90) * Math.PI) / 180) * radius;
                        const y2 =
                          centerY +
                          Math.sin(((endAngle - 90) * Math.PI) / 180) * radius;

                        const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                        const pathData = [
                          `M ${centerX} ${centerY}`,
                          `L ${x1} ${y1}`,
                          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                          "Z",
                        ].join(" ");

                        const isActive = !isSpinning && theme === segment.id;

                        return (
                          <g key={segment.id}>
                            <path
                              d={pathData}
                              fill={
                                isActive ? segment.color : `${segment.color}B3`
                              }
                              stroke={
                                isActive ? segment.color : `${segment.color}33`
                              }
                              strokeWidth={isActive ? 2 : 1}
                              className={`transition-all duration-300 ${!isSpinning ? "hover:opacity-90" : ""}`}
                              style={{
                                cursor: !isSpinning ? "pointer" : "default",
                                pointerEvents: !isSpinning ? "auto" : "none",
                              }}
                              role="button"
                              aria-label={`Select ${segment.text} theme`}
                              onClick={() => handleSegmentClick(segment)}
                            />

                            <text
                              x={
                                centerX +
                                Math.cos(((midAngle - 90) * Math.PI) / 180) *
                                  (radius * 0.7)
                              }
                              y={
                                centerY +
                                Math.sin(((midAngle - 90) * Math.PI) / 180) *
                                  (radius * 0.7)
                              }
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill={isActive ? "#ffffff" : "#e0e0e0"}
                              fontSize="11"
                              fontWeight="500"
                              transform={`rotate(${midAngle}, ${
                                centerX +
                                Math.cos(((midAngle - 90) * Math.PI) / 180) *
                                  (radius * 0.7)
                              }, ${
                                centerY +
                                Math.sin(((midAngle - 90) * Math.PI) / 180) *
                                  (radius * 0.7)
                              })`}
                              style={{ pointerEvents: "none" }}
                            >
                              {segment.text}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative w-16 h-16">
                      <button
                        type="button"
                        onClick={spinWheel}
                        disabled={isSpinning}
                        className="relative w-16 h-16 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-all duration-300 border-2 border-primary-foreground/50 shadow-md"
                      >
                        {isSpinning ? (
                          <LoaderPinwheel
                            className="animate-spin text-primary-foreground"
                            size={24}
                          />
                        ) : (
                          <LoaderPinwheel
                            className="text-primary-foreground ml-1"
                            size={24}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          <button
            onClick={handleExpand}
            type="button"
            className="relative bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <Palette size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
