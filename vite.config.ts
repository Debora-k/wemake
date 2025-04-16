import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from '@sentry/react-router';




export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd(), "");
  const sentryConfig: SentryReactRouterBuildOptions = {
    org: "wemake-wg",
    project: "wemake",
    authToken: env.SENTRY_AUTH_TOKEN
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
