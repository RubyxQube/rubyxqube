import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If deploying to GitHub Pages, set base to your repo name:
// e.g. base: "/my-repo-name/"
export default defineConfig({
  plugins: [react()],
  // base: "/my-repo-name/",
});
