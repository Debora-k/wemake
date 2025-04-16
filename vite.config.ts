import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from '@sentry/react-router';

export default defineConfig((config) => {
  const sentryConfig: SentryReactRouterBuildOptions = {
    org: "wemake-wg",
    project: "wemake",
    authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
  };

  return {
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [reactRouter(), tsconfigPaths(), sentryReactRouter(sentryConfig, config)],
  server: {
    allowedHosts: true,
    },
  };
});
