// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Disable the Nitro/Cloudflare deploy plugin. We ship a pure static SPA over
  // FTP, and Nitro redirects the SSR build away from `dist/server`, which breaks
  // the SPA shell prerender (its preview server expects `dist/server/server.js`).
  nitro: false,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    // Static SPA output for FTP / shared hosting (HTML, CSS, JS).
    // Only the client shell is prerendered to index.html; all routes render
    // client-side, with the .htaccess fallback rewriting 404s to index.html.
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/index.html",
        crawlLinks: false,
      },
    },
  },
});
