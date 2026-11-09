import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// GitHub Pages serves this repo from a /Coo-Down/ subpath instead of a
// domain root. The workflow sets DEPLOY_TARGET=github-pages for the
// published build; local dev keeps the default "/".
const isGithubPages = process.env["DEPLOY_TARGET"] === "github-pages";

export default defineConfig({
  base: isGithubPages ? "/Coo-Down/" : "/",
  plugins: [tsConfigPaths(), viteReact(), tailwindcss()],
});
