import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  variant?: "table" | "card" | "list" | "hero" | "gallery";
  count?: number;
  className?: string;
}

export function LoadingSkeleton({
  variant = "card",
  count = 3,
  className = "",
}: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case "table":
        return (
          <div className={`space-y-4 ${className}`}>
            <Skeleton className="h-8 w-full" />
            {Array.from({ length: count }).map((_, i) => (
              <div key={`table-row-${i + 1}`} className="flex space-x-4">
                <Skeleton className="h-12 w-16" />
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-8" />
              </div>
            ))}
          </div>
        );

      case "card":
        return (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
          >
            {Array.from({ length: count }).map((_, i) => (
              <motion.div
                key={`card-${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="space-y-4 p-6 border rounded-lg"
              >
                <Skeleton className="h-48 w-full rounded-md" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </motion.div>
            ))}
          </div>
        );

      case "list":
        return (
          <div className={`space-y-4 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
              <motion.div
                key={`list-item-${i + 1}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center space-x-4"
              >
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "hero":
        return (
          <div className={`space-y-8 ${className}`}>
            <Skeleton className="h-16 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={`hero-item-${i + 1}`} className="h-24 w-full" />
              ))}
            </div>
          </div>
        );

      case "gallery":
        return (
          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}
          >
            {Array.from({ length: count }).map((_, i) => (
              <motion.div
                key={`gallery-item-${i + 1}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Skeleton className="h-32 w-full rounded-md" />
              </motion.div>
            ))}
          </div>
        );

      default:
        return (
          <div className={`space-y-4 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
              <Skeleton key={`default-${i + 1}`} className="h-20 w-full" />
            ))}
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="animate-pulse"
    >
      {renderSkeleton()}
    </motion.div>
  );
}

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  error,
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="mt-2">
          {error}
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-3 ml-0"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </motion.div>
  );
}

interface EmptyStateProps {
  message?: string;
  description?: string;
  className?: string;
}

export function EmptyState({
  message = "No data found",
  description = "There's nothing to display right now.",
  className = "",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`text-center py-12 ${className}`}
    >
      <div className="text-muted-foreground">
        <div className="text-lg font-medium">{message}</div>
        <div className="text-sm mt-1">{description}</div>
      </div>
    </motion.div>
  );
}
