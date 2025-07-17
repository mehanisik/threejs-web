import { Moon, Palette, Droplets, Leaf, Sun, Flame } from "lucide-react";
import type { ThemeColors, ThemeMeta, ThemeName } from "~/types/theme";

export const themeColors: Record<ThemeName, ThemeColors> = {
  dark: {
    background: "oklch(0.1957 0 0)",
    foreground: "oklch(0.985 0 0)",
    primary: "oklch(0.922 0 0)",
    primaryForeground: "oklch(0.205 0 0)",
    secondary: "oklch(0.269 0 0)",
    secondaryForeground: "oklch(0.985 0 0)",
    muted: "oklch(0.269 0 0)",
    mutedForeground: "oklch(0.708 0 0)",
    accent: "oklch(0.269 0 0)",
    accentForeground: "oklch(0.985 0 0)",
    destructive: "oklch(0.704 0.191 22.216)",
    border: "oklch(1 0 0 / 10%)",
    ring: "oklch(0.556 0 0)",
  },
  light: {
    background: "oklch(0.985 0 0)",
    foreground: "oklch(0.205 0 0)",
    primary: "oklch(0.205 0 0)",
    primaryForeground: "oklch(0.985 0 0)",
    secondary: "oklch(0.269 0 0)",
  },
  orange: {
    background: "oklch(0.7022 0.2004 45.1)",
    foreground: "oklch(0.98 0.02 161.03)",
    primary: "oklch(0.922 0 0)",
    primaryForeground: "oklch(0.205 0 0)",
    secondary: "oklch(0.269 0 0)",
  },
  blue: {
    background: "oklch(0.5209 0.2478 262.36)",
    foreground: "oklch(0.98 0.01 262.36)",
    primary: "oklch(0.205 0 0)",
    primaryForeground: "oklch(0.985 0 0)",
    secondary: "oklch(0.269 0 0)",
  },
  green: {
    background: "oklch(0.4784 0.1065 161.03)",
    foreground: "oklch(0.98 0.02 161.03)",
    primary: "oklch(0.205 0 0)",
    primaryForeground: "oklch(0.985 0 0)",
    secondary: "oklch(0.269 0 0)",
  },
  zinc: {
    background: "oklch(0.5 0 0)",
    foreground: "oklch(0.98 0 0)",
    primary: "oklch(0.205 0 0)",
    primaryForeground: "oklch(0.985 0 0)",
    secondary: "oklch(0.269 0 0)",
  },
  rose: {
    background: "oklch(0.6 0.2 10)",
    foreground: "oklch(1 0.02 10)",
    primary: "oklch(0.205 0 0)",
    primaryForeground: "oklch(0.985 0 0)",
    secondary: "oklch(0.269 0 0)",
  },
};

export const themes: ThemeMeta[] = [
  {
    value: "dark",
    label: "Midnight",
    icon: Moon,
    color: "oklch(0.1957 0 0)",
    description: "Dark midnight theme",
  },
  {
    value: "light",
    label: "Light",
    icon: Palette,
    color: "oklch(1 0 0)",
    description: "Clean light theme",
  },
  {
    value: "blue",
    label: "Ocean",
    icon: Droplets,
    color: "oklch(0.5209 0.2478 262.36)",
    description: "Deep ocean vibes",
  },
  {
    value: "green",
    label: "Forest",
    icon: Leaf,
    color: "oklch(0.4784 0.1065 161.03)",
    description: "Natural forest theme",
  },
  {
    value: "orange",
    label: "Sunset",
    icon: Sun,
    color: "oklch(0.7022 0.2004 45.1)",
    description: "Warm sunset colors",
  },
  {
    value: "zinc",
    label: "Zinc",
    icon: Palette,
    color: "oklch(0.5 0 0)",
    description: "Modern zinc theme",
  },
  {
    value: "rose",
    label: "Rose",
    icon: Flame,
    color: "oklch(0.6 0.2 10)",
    description: "Vibrant rose theme",
  },
];
