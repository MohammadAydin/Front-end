import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    host: "localhost",
    proxy: {
      "/v1": {
        target: "https://woundwann.de",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  // base: "/landing", //! For host don't remove it
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
