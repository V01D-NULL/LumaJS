const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

// Recursively get all page files with 'page' in the filename
function getPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getPageFiles(filePath, fileList);
    } else if (file.includes("page") && file.endsWith(".tsx")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

async function bundle() {
  console.log("[*] Building server...");
  // Build the main bundle
  await esbuild
    .build({
      entryPoints: ["src/router/index.ts"],
      bundle: true,
      outfile: ".luma/server.js",
      minify: true,
      platform: "node",
      loader: {
        ".ts": "ts",
      },
    })
    .catch(() => process.exit(1));

  console.log("[+] Built server");

  console.log("[*] Gathering & building SSR pages...");

  // Build individual page files
  const pagesDir = "src/pages";
  const pageFiles = getPageFiles(pagesDir);

  pageFiles.forEach((filePath) => {
    const relativePath = path.relative(pagesDir, filePath);
    const outPath = path.join(
      ".luma/pages",
      relativePath.replace(".tsx", ".js")
    );

    esbuild
      .build({
        entryPoints: [filePath],
        bundle: true,
        outfile: outPath,
        platform: "node",
        minify: true,
        loader: {
          ".js": "jsx",
          ".ts": "ts",
          ".tsx": "tsx",
        },
        jsx: "automatic",
        jsxDev: true,
        alias: {
          "react/jsx-dev-runtime":
            "../../packages/luma-js/build/reconciler/createElement.js",
        },
      })
      .catch(() => process.exit(1));
  });
  console.log("[+] Built SSR pages");
  console.log("[+] Build complete");
}

bundle();
