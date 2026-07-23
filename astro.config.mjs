import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://viscory.github.io",
  outDir: "./dist",
  integrations: [sitemap()],
});
