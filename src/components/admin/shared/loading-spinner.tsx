import { cn } from "@/lib/utils";
import type { LoadingSpinnerProps } from "@/types/admin";

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "w-5 h-5 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin",
        className,
      )}
    />
  );
}
