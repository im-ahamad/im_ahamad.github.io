import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    viteImagemin({
      verbose: false,
      mozjpeg: {
        quality: 80,
      },
      optipng: {
        optimizationLevel: 4,
      },
      pngquant: {
        quality: [0.7, 0.85],
      },
      webp: {
        quality: 80,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          i18n: ["i18next", "react-i18next"],
          icons: ["lucide-react"],
        },
      },
    },
  },
}));
