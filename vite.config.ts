import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import htmlMinifier from "vite-plugin-html-minifier-terser";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import svgr from "vite-plugin-svgr";

const env = process.env.NODE_ENV;
const base = env === "production" ? "/" : "/";

export default defineConfig({
  base: base,

  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
    ViteImageOptimizer({}),
    svgr(),
    htmlMinifier({
      collapseWhitespace: true,
      removeComments: true,
      conservativeCollapse: true,
      preserveLineBreaks: true,
    }),
    visualizer({
      open: true,
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
    }),
    compression({
      algorithms: ["gzip"],
      filename: "[path][base].gz",
      threshold: 10240,
      include: [/\.(js|mjs|css|html)$/],
      skipIfLargerOrEqual: true,
    }),

    compression({
      algorithms: ["brotliCompress"],
      filename: "[path][base].br",
      threshold: 10240,
      include: [/\.(js|mjs|css|html)$/],
      skipIfLargerOrEqual: true,
    }),
    ViteImageOptimizer({
      png: { quality: 75 },
      jpeg: { quality: 75 },
      webp: { quality: 75 },
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
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    sourcemap: process.env.NODE_ENV !== "production",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("motion/react")) return "vendor-motion";
            if (id.includes("react") || id.includes("react-dom"))
              return "vendor-react";
            if (id.includes("three")) return "vendor-three";
          }
        },
      },
    },
  },
});
