import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: "localhost",
    proxy: {
      "/api": {
        target: "https://woundwann.de/v1", // الـ backend الأصلي
        changeOrigin: true,
        secure: true, // أو false حسب ما إذا كان السيرفر لديه شهادة SSL صالحة
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
