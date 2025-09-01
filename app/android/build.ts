import esbuild from "esbuild";
import sassPlugin from "esbuild-sass-plugin";

function build() {
  return esbuild.build({
    minify: true,
    bundle: true,
    treeShaking: true,
    sourcemap: true,
    platform: "browser",
    loader: {
      ".ts": "ts",
      ".tsx": "tsx",
      ".svg": "dataurl",
      ".png": "dataurl",
      ".webp": "dataurl",
      ".scss": "css",
    },
    jsx: "automatic",
    jsxDev: true,
    alias: {
      "react/jsx-dev-runtime":
        "../../packages/luma-js/build/reconciler/createElement.js", // Normally you'd replace this with node_modules/...*
    },
    keepNames: true,
    plugins: [sassPlugin({ cssImports: true, type: "local-css" })],
    entryPoints: ["src/App.tsx"],
    outfile: "dist/App.js",
    format: "iife",
  });
}

build()
  .then(() => console.log("Build successful"))
  .catch((err) => console.error("Build failed:", err));
