import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";
import { sentryOnBuildEnd } from '@sentry/react-router';
export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true, //server-side rendering
  presets: [vercelPreset()],
  buildEnd: async ({ viteConfig, reactRouterConfig, buildManifest }) => {
  await sentryOnBuildEnd({ viteConfig, reactRouterConfig, buildManifest });
  },
} satisfies Config;
