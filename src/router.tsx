import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { DefaultCatchBoundary } from "./components/layout/default-catch-boundary";
import { NotFound } from "./components/ui/not-found";
import * as TanstackQuery from "./integrations/root-provider";
import { routeTree } from "./routeTree.gen";

export const createRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createTanstackRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: "intent",
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <TanstackQuery.Provider {...rqContext}>
          {props.children}
        </TanstackQuery.Provider>
      );
    },
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: DefaultCatchBoundary,
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
