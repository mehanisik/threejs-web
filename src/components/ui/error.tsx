import { X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorAlert({
  message,
  onDismiss,
  className = "",
}: ErrorAlertProps) {
  return (
    <div className={`fixed top-0 left-0 w-full z-50 p-4 ${className}`}>
      <Alert className="border-red-200 bg-red-50">
        <div className="flex items-center justify-between">
          <AlertDescription className="text-red-800">
            {message}
          </AlertDescription>
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Alert>
    </div>
  );
}
