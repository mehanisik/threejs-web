import type * as React from "react";
import { cn } from "~/lib/utils";
import { Badge } from "./badge";

export function SectionTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-8 lg:mb-12 text-left w-full pl-2",
        className,
      )}
      {...props}
    />
  );
}

export function SectionSubtitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-xl md:text-2xl font-light tracking-wide mb-4",
        className,
      )}
      {...props}
    />
  );
}

export function SectionHeader({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "text-sm uppercase tracking-widest font-medium mb-4",
        className,
      )}
      {...props}
    />
  );
}

export function SectionBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-sm uppercase tracking-widest font-medium mb-4",
        className,
      )}
      {...props}
    />
  );
}
