import { Loader2 } from "lucide-react";

export function Pending() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-gray-400 animate-spin mx-auto" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Loading Project
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Please wait while we gather the project details and images...
        </p>
        <div className="flex justify-center">
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gray-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
