type Oklch = `oklch(${number} ${number} ${number}${string | ""})`;

export interface ThemeColors {
  background: Oklch;
  foreground: Oklch;
  primary: Oklch;
  primaryForeground: Oklch;
  secondary: Oklch;
  secondaryForeground?: Oklch;
  muted?: Oklch;
  mutedForeground?: Oklch;
  accent?: Oklch;
  accentForeground?: Oklch;
  destructive?: Oklch;
  border?: Oklch;
  ring?: Oklch;
}

export type ThemeName =
  | "dark"
  | "light"
  | "orange"
  | "blue"
  | "green"
  | "zinc"
  | "rose";

export interface ThemeMeta {
  value: ThemeName;
  label: string;
  icon: React.ElementType;
  color: Oklch;
  description: string;
}
