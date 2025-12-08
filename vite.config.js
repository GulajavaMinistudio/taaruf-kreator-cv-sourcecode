import { defineConfig } from "vite";

/**
 * Vite Configuration for Taaruf CV Kreator
 * https://vitejs.dev/config/
 */
export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          bootstrap: ["bootstrap"],
        },
      },
    },
  },
  base: "./",
});
