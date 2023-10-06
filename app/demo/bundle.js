const esbuild = require("esbuild");
const chokidar = require("chokidar");
const liveServer = require("live-server");

// Function to bundle with esbuild
function bundle() {
  esbuild
    .build({
      entryPoints: ["src/App.tsx"], // Adjust if your entry point is different
      bundle: true,
      outfile: "dist/bundle.js",
      loader: {
        ".js": "jsx",
        ".ts": "ts",
        ".tsx": "tsx",
      },
      jsxFactory: "LumaJS.createElement",
      jsxFragment: "LumaJS.Fragment",
    })
    .catch(() => process.exit(1));
}

// Initial build
bundle();

// Watch for changes
chokidar.watch(["src/**/*", "../../package/**/*"]).on("change", bundle);

// Serve with live-server
liveServer.start({
  root: ".",
  open: false,
  wait: 200, // Wait for all changes, before reloading.
});
