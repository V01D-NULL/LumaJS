import esbuild from "esbuild";
import fs from "fs";
import path from "path";
const LumaConfig = require(path.resolve(process.cwd(), "luma.config.json"));

// Recursively get all page files with 'page' in the filename
function getPageFiles(dir: string, fileList: string[] = []) {
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

const removeGetServerPropsPlugin = {
  name: "remove-getServerProps",
  setup(build: any) {
    build.onLoad({ filter: /\.page.tsx$/ }, (args: any) => {
      const code = fs.readFileSync(args.path, "utf8");

      const modifiedCode = code.replace(
        /export\s+async\s+function\s+getServerProps[\s\S]*?}\s*$/gm,
        ""
      );

      return {
        contents: modifiedCode,
        loader: "tsx",
      };
    });
  },
};

async function bundle() {
  console.log("[*] Building server...");
  // Build the main bundle
  await esbuild
    .build({
      entryPoints: [LumaConfig.server],
      bundle: true,
      outfile: ".luma/server.js",
      minify: !true,
      platform: "node",
      loader: {
        ".ts": "ts",
      },
    })
    .catch(() => process.exit(1));

  console.log("[+] Built server");

  console.log("[*] Bundling client payload...");
  await esbuild
    .build({
      entryPoints: [path.resolve(__dirname, "build-utils/client.js")],
      bundle: true,
      minify: !true,
      outfile: ".luma/client.js",
      platform: "browser",
      loader: {
        ".ts": "ts",
      },
      globalName: "__LUMA_FRAMEWORK__",
    })
    .catch(() => process.exit(1));
  console.log("[+] Bundled client payload");

  console.log("[*] Gathering & building SSR pages...");

  // Build individual page files
  const pagesDir = `${LumaConfig.source}/pages`;
  const pageFiles = getPageFiles(pagesDir);

  pageFiles.forEach((filePath) => {
    const relativePath = path.relative(pagesDir, filePath);
    const outPathServer = path.join(
      ".luma/pages/server/",
      relativePath.replace(".tsx", ".js")
    );
    const outPathClient = path.join(
      ".luma/pages/client/",
      relativePath.replace(".tsx", ".js")
    );
    console.log(`[+] Building ${relativePath}`);

    esbuild
      .build({
        plugins: [removeGetServerPropsPlugin],
        entryPoints: [filePath],
        treeShaking: true,
        bundle: true,
        outfile: outPathClient,
        platform: "browser",
        minify: true,
        loader: {
          ".tsx": "tsx",
        },
        jsx: "automatic",
        jsxDev: true,
        alias: {
          "react/jsx-dev-runtime":
            "../../packages/luma-js/build/reconciler/createElement.js",
        },
        keepNames: true,
        globalName: "__LUMA_ROOT__",
        format: "iife",
        inject: [path.resolve(__dirname, "build-utils/luma-shim.js")],
        banner: {
          js: "if (!window.__LUMA_FRAMEWORK__) window.__LUMA_FRAMEWORK__ = {};", // stub global framework instance if it does not yet exist
        },
      })
      .catch(() => process.exit(1));

    esbuild.build({
      entryPoints: [filePath],
      bundle: true,
      outfile: outPathServer,
      platform: "node",
      minify: !true,
      loader: {
        ".ts": "ts",
        ".tsx": "tsx",
      },
      jsx: "automatic",
      jsxDev: true,
      alias: {
        "react/jsx-dev-runtime":
          "../../packages/luma-js/build/reconciler/createElement.js",
      },
      keepNames: true,
    });
  });

  console.log("[*] Bundling layout");
  esbuild
    .build({
      entryPoints: [`${LumaConfig.source}/pages/layout.tsx`],
      bundle: true,
      outfile: ".luma/pages/server/layout.js",
      platform: "node",
      minify: !true,
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
      keepNames: true,
    })
    .catch(() => process.exit(1));
  console.log("[+] Bundled layout");

  console.log("[+] Built SSR pages");
  console.log("[+] Build complete");
}

export { bundle };
