import { Card, CardContent } from "~/components/ui/card";
import { AlertCircle } from "lucide-react";

export function NotFoundPage() {
  return (
    <main className="relative w-full h-full min-h-screen overflow-x-hidden text-foreground antialiased scroll-smooth noise bg-background flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 bg-card">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="w-4 h-4" />
            <h1 className="text-2xl font-bold">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            The page you are looking for does not exist.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
