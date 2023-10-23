import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const localHost = "http://127.0.0.1";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/logIn": {
        target: `${localHost}:5000`,
        changeOrigin: true,
      },
      "/signUp": {
        target: `${localHost}:5000`,
        changeOrigin: true,
      },
      "/authenticate": {
        target: `${localHost}:5000`,
        changeOrigin: true,
      },
      "/api/v1/graphql": {
        target: `${localHost}:5000`,
        changeOrigin: true,
      },
    },
  },
});
