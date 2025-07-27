import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  base: "/",
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
    ViteImageOptimizer({}),
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
    sourcemap: false,
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1850,
  },
});
