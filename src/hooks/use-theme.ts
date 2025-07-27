import { useEffect, useState } from "react";
import { showErrorToast } from "@/components/ui/error-toast";
import { themes } from "@/constants/themes";
import type { ThemeName } from "@/types/theme";

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
    } catch {
      return "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", theme);
      }
    } catch {
      showErrorToast("Error setting theme");
    }
  }, [theme]);

  return [theme, setTheme];
}
