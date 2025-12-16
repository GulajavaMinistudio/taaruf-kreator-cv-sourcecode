import { defineConfig } from "vite";

/**
 * Vite Configuration for Taaruf CV Kreator
 * Phase 6: Production Optimization
 * https://vitejs.dev/config/
 */
export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    // Disable sourcemaps in production for smaller bundle
    sourcemap: false,
    // Use Terser for better minification
    minify: "terser",
    terserOptions: {
      compress: {
        // Remove all console.* calls in production
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
      },
      format: {
        // Remove comments
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          bootstrap: ["bootstrap"],
        },
        // Hashed filenames for cache busting
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "assets/[name]-[hash].min.css";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    // Enable CSS code splitting and minification
    cssCodeSplit: true,
    cssMinify: true,
  },
  base: "/pembuat-cv-taaruf-islam/",
});
