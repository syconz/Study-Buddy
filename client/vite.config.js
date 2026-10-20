import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In development, any request starting with /api is forwarded to the Express server.
// This way the React code can just call "/api/notes" without worrying about ports or CORS.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
