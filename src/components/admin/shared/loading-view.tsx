import { LoadingSpinner } from "./loading-spinner";

interface LoadingViewProps {
  height?: string;
}

export function LoadingView({ height = "h-64" }: LoadingViewProps) {
  return (
    <div className={`flex items-center justify-center ${height}`}>
      <LoadingSpinner />
    </div>
  );
}
