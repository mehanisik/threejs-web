import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { fetchUserFn, signOutFn } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const { user } = await fetchUserFn();
    if (!user) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }
    return { user };
  },
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const { user } = Route.useRouteContext();
  const state = useRouterState();
  const path = state.location.pathname;

  return (
    <div className="min-h-dvh w-full bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="font-semibold">Admin</div>
            <nav className="hidden md:flex items-center gap-2 text-sm">
              <Link
                to="/admin"
                className={`px-2 py-1 rounded ${path === "/admin" ? "bg-muted" : "text-muted-foreground hover:bg-muted"}`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/projects"
                className={`px-2 py-1 rounded ${path.startsWith("/admin/projects") ? "bg-muted" : "text-muted-foreground hover:bg-muted"}`}
              >
                Projects
              </Link>
              <Link
                to="/admin/images"
                className={`px-2 py-1 rounded ${path.startsWith("/admin/images") ? "bg-muted" : "text-muted-foreground hover:bg-muted"}`}
              >
                Images
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <button
              type="button"
              onClick={async () => {
                const { success } = await signOutFn();
                if (success) {
                  navigate({ to: "/auth/sign-in", replace: true });
                }
              }}
              className="px-3 py-1 border rounded"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
