import { env } from "node:process";

export default {
  common: {
    minify: env.NODE_ENV !== "LUMA_DEV", // TODO: Use env var to toggle
    bundle: true,
    treeShaking: true,
    sourcemap: !true, // TODO: Use env var to toggle
  },

  server: {
    platform: "node",
    loader: {
      ".ts": "ts",
      ".tsx": "tsx",
    },
  },

  client: {
    platform: "browser",
    loader: {
      ".ts": "ts",
      ".tsx": "tsx",
    },
  },

  jsx: {
    loader: {
      ".tsx": "tsx",
    },
    jsx: "automatic",
    jsxDev: true, // TODO: Use env var to toggle
    alias: {
      "react/jsx-dev-runtime":
        env.NODE_ENV === "LUMA_DEV"
          ? "../../packages/luma-js/build/reconciler/createElement.js"
          : "node_modules/luma-js/build/reconciler/createElement.js",
    },
    keepNames: true, // TODO: Use env var to toggle
  },
} as const;
