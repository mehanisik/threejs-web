import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { Route, Switch } from "wouter";
import { MouseTrail } from "./components/ui/mouse-trail";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./lib/auth";
import { LenisProvider } from "./lib/lenis";
import { AdminPage } from "./pages/admin";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";
import { ProjectPage } from "./pages/project";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/projects/:id" component={ProjectPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App({
  helmetContext,
}: {
  helmetContext?: { helmet?: HelmetServerState };
}) {
  return (
    <HelmetProvider context={helmetContext}>
      <AuthProvider>
        <LenisProvider>
          <MouseTrail />
          <Router />
        </LenisProvider>
        <Toaster />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
