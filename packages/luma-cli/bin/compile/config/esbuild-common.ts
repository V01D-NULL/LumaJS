import { env } from "node:process";

export default {
  common: {
    minify: env.LUMA_DEV === "false",
    bundle: true,
    treeShaking: true,
    sourcemap: env.LUMA_DEV === "false", // TODO: Use env var to toggle
  },

  server: {
    platform: "node",
    loader: {
      ".ts": "ts",
      ".tsx": "tsx",
      ".scss": "css",
    },
  },

  client: {
    platform: "browser",
    loader: {
      ".ts": "ts",
      ".tsx": "tsx",
      ".scss": "css",
    },
  },

  jsx: {
    loader: {
      ".tsx": "tsx",
      ".svg": "dataurl",
      ".png": "dataurl",
      ".webp": "dataurl",
    },
    jsx: "automatic",
    jsxDev: true, // TODO: Use env var to toggle
    alias: {
      "react/jsx-dev-runtime":
        env.LUMA_DEV === "true"
          ? "../../packages/luma-js/build/reconciler/createElement.js"
          : "node_modules/luma-js/build/reconciler/createElement.js",
    },
    keepNames: true, // TODO: Use env var to toggle
  },
} as const;
