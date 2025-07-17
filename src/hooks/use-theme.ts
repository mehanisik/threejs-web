import { useEffect, useState } from "react";
import { themes } from "~/constants/themes";
import type { ThemeName } from "~/types/theme";

export function useTheme(): [ThemeName, (theme: ThemeName) => void] {
  const [theme, setTheme] = useState<ThemeName>(() => {
    try {
      if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem("theme") as ThemeName | null;
        const themeValues = themes.map((t) => t.value);
        if (savedTheme && themeValues.includes(savedTheme)) {
          return savedTheme;
        }
      }
    } catch (_error) {
      console.warn("localStorage not available, using default theme");
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", theme);
      }
    } catch (_error) {
      console.warn("localStorage not available for theme persistence");
    }
  }, [theme]);

  return [theme, setTheme];
}
