import { useState } from "react";

export const useHackerText = (
  originalText: string,
  options?: {
    intervalSpeed?: number;
    revealRate?: number;
    chaosCharacters?: string;
  },
) => {
  const [displayText, setDisplayText] = useState(originalText);
  const [isHacking, setIsHacking] = useState(false);

  const characters =
    options?.chaosCharacters ??
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/";

  const intervalSpeed = options?.intervalSpeed ?? 30;
  const revealRate = options?.revealRate ?? 3;

  const startHacking = () => {
    if (isHacking) return;
    setIsHacking(true);

    let iterations = 0;
    const textLength = originalText.length;

    const interval = setInterval(() => {
      setDisplayText((_prev) =>
        originalText
          .split("")
          .map((_char, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join(""),
      );

      iterations += 1 / revealRate;

      if (iterations >= textLength) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsHacking(false);
      }
    }, intervalSpeed);
  };

  const stopHacking = () => {
    setDisplayText(originalText);
    setIsHacking(false);
  };

  return { displayText, startHacking, stopHacking, isHacking };
};
