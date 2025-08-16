export default {
  common: {
    minify: true, // TODO: Use env var to toggle
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
        "../../packages/luma-js/build/reconciler/createElement.js",
    },
    keepNames: true, // TODO: Use env var to toggle
  },
} as const;
