import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { API_BASE_URL } from "./src/config/api.js";

const API_PROXY_TARGET = API_BASE_URL;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: "localhost",
    proxy: {
      "/api": {
        target: API_PROXY_TARGET, // Backend API
        changeOrigin: true,
        secure: true, // أو false حسب ما إذا كان السيرفر لديه شهادة SSL صالحة
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
