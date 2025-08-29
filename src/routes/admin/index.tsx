import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/admin/projects"
          className="group rounded-lg border p-4 hover:bg-muted transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-medium">Projects</h2>
              <p className="text-sm text-muted-foreground">
                Create, edit, and organize portfolio projects.
              </p>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground">
              →
            </span>
          </div>
        </Link>

        <Link
          to="/admin/images"
          className="group rounded-lg border p-4 hover:bg-muted transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-medium">Images</h2>
              <p className="text-sm text-muted-foreground">
                Upload, tag, and manage images.
              </p>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground">
              →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
