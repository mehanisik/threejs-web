import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import Sonda from "sonda/vite";
import { defineConfig } from "vite";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

export default defineConfig({
  base: "/",
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
    Sonda(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: "/prerender.tsx",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/assets": path.resolve(import.meta.dirname, "assets"),
      "@/components": path.resolve(import.meta.dirname, "src/components"),
      "@/pages": path.resolve(import.meta.dirname, "src/pages"),
      "@/constants": path.resolve(import.meta.dirname, "src/constants"),
      "@/styles": path.resolve(import.meta.dirname, "src/styles"),
      "@/hooks": path.resolve(import.meta.dirname, "src/hooks"),
      "@/lib": path.resolve(import.meta.dirname, "src/lib"),
      "@/types": path.resolve(import.meta.dirname, "src/types"),
    },
  },
  build: {
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1850,
  },
});
