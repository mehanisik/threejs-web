import { renderToString } from "react-dom/server";
import type { HelmetServerState } from "react-helmet-async";
import App from "./src/app";

if (typeof globalThis.localStorage === "undefined") {
  const m = new Map<string, string>();
  (globalThis as { localStorage: Storage }).localStorage = {
    get length() {
      return m.size;
    },
    key: (i: number) => Array.from(m.keys())[i] ?? null,
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => m.set(k, v),
    removeItem: (k: string) => m.delete(k),
    clear: () => m.clear(),
  } as unknown as Storage;
}

export async function prerender() {
  const helmetCtx: { helmet?: HelmetServerState } = {};

  const html = renderToString(<App helmetContext={helmetCtx} />);

  const rawTitle = helmetCtx.helmet?.title?.toString() ?? "";
  const titleText = rawTitle.replace(/<\/?title[^>]*>/g, "");
  const metaTags = helmetCtx.helmet?.meta?.toString() ?? "";

  return {
    html,
    head: {
      title: titleText,
      elements: new Set([metaTags]),
    },
  };
}
