import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "https://woundwann.de",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, "/v1"),
      },
    },
  },
});
