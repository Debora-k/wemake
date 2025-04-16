import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from '@sentry/react-router';

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "wemake-wg",
  project: "wemake",
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

export default defineConfig((config) => {

  return {
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [reactRouter(), tsconfigPaths(), sentryReactRouter(sentryConfig, config)],
  sentryConfig,
  server: {
    allowedHosts: true,
    },
  };
});
