import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // base: "/landing", //! For host don't remove it
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
    host: "localhost",
  },
});
