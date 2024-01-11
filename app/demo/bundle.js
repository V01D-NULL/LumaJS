const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

// Function to recursively get all page files with 'page' in the filename
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

// Function to bundle with esbuild
function bundle() {
  // Build the main bundle
  esbuild
    .build({
      entryPoints: ["src/router.ts"],
      bundle: true,
      outfile: "dist/bundle.js",
      platform: "node",
      loader: {
        ".js": "jsx",
        ".ts": "ts",
        ".tsx": "tsx",
      },
      jsx: "automatic",
      jsxDev: true,
      // Additional configurations if needed
    })
    .catch(() => process.exit(1));

  // Build individual page files
  const pagesDir = "src/pages";
  const pageFiles = getPageFiles(pagesDir);

  pageFiles.forEach((filePath) => {
    const relativePath = path.relative(pagesDir, filePath);
    const outPath = path.join(
      "dist/pages",
      relativePath.replace(".tsx", ".js")
    );

    esbuild
      .build({
        entryPoints: [filePath],
        bundle: true,
        outfile: outPath,
        platform: "node",
        loader: {
          ".js": "jsx",
          ".ts": "ts",
          ".tsx": "tsx",
        },
        jsx: "automatic",
        jsxDev: true,
        alias: {
          "react/jsx-dev-runtime":
            "../../package/build/reconciler/createElement.js",
        },
      })
      .catch(() => process.exit(1));
  });
}

// Initial build
bundle();
