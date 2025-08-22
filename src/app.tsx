import { AnimatePresence } from "framer-motion";
import type { HelmetServerState } from "react-helmet-async";
import { Route, Switch } from "wouter";
import { LiveRegion } from "./components/accessibility/live-region";
import { SkipLink } from "./components/accessibility/skip-link";
import { SEOProvider } from "./components/seo/seo-provider";
import { AdminPage } from "./pages/admin";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";
import { ProjectPage } from "./pages/project";
import { Providers } from "./providers";

interface AppProps {
  helmetContext?: { helmet?: HelmetServerState };
}

function Router() {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/projects/:slug" component={ProjectPage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </AnimatePresence>
  );
}

const App = ({ helmetContext }: AppProps) => {
  return (
    <SEOProvider helmetContext={helmetContext}>
      <Providers>
        <SkipLink />
        <LiveRegion aria-live="polite" aria-atomic={true}>
          <span>Screen reader announcements will be inserted here</span>
        </LiveRegion>
        <main id="main-content" tabIndex={-1}>
          <Router />
        </main>
      </Providers>
    </SEOProvider>
  );
};

export default App;
