import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { Route, Switch } from "wouter";
import { AdminPage } from "~/pages/admin";
import { Toaster } from "./components/ui/sonner";
import { LenisProvider } from "./lib/lenis";
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
      <LenisProvider>
        <Router />
      </LenisProvider>
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
