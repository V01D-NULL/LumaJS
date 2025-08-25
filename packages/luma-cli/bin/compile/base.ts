import path from "node:path";
import EsbuildCommon from "./config/esbuild-common";
import { getPageFiles } from "./utils";
import esbuild from "esbuild";
import { removeGetServerPropsPlugin } from "./config/esbuild-plugins";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sassPlugin from "esbuild-sass-plugin";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";

export class Compile {
  private readonly LumaConfig: any;
  private readonly pages: string[];

  constructor() {
    this.LumaConfig = require(path.resolve(process.cwd(), "luma.config.json"));
    this.pages = getPageFiles(`${this.LumaConfig.source}/pages`);
  }

  public async compile() {
    try {
      await Promise.all([
        this.compileServer(),
        this.compileFramework(),
        this.compileLayout(),
        this.compilePages(),
        this.compileCss(),
      ]);
      console.log("[+] Done!");
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  private async compileServer() {
    console.log("[*] Building server...");

    return esbuild.build({
      ...EsbuildCommon.common,
      ...EsbuildCommon.server,
      entryPoints: [this.LumaConfig.server],
      outfile: ".luma/server.js",
    });
  }
  private async compileFramework() {
    console.log("[*] Bundling framework (client) payload...");

    return esbuild.build({
      ...EsbuildCommon.common,
      ...EsbuildCommon.client,
      outfile: ".luma/framework.js",
      entryPoints: [path.resolve(__dirname, "static/framework.js")],
      globalName: "__LUMA_FRAMEWORK__",
    });
  }

  private async compilePages() {
    console.log("[*] Gathering & building SSR pages...");

    const pageMapping: Record<
      string,
      {
        cssBundle: string | null;
        server: { refs: string[] | null };
        client: { refs: string[] | null };
      }
    > = {};

    for (const filePath of this.pages) {
      const url = `/${filePath.split("/").slice(2, -1).join("/")}`; // Remove src/pages and the *.page.tsx to get the URL

      if (!filePath.endsWith(".tsx")) {
        const fileUrl = `/${filePath.split("/").slice(2).join("/")}`;
        pageMapping[fileUrl] = {
          cssBundle: null,
          server: { refs: null },
          client: { refs: null },
        };

        mkdirSync(
          path.dirname(
            `.luma/pages/server/${
              filePath.split("/")[filePath.split("/").length - 1]
            }`
          ),
          { recursive: true }
        );

        mkdirSync(
          path.dirname(
            `.luma/pages/client/${
              filePath.split("/")[filePath.split("/").length - 1]
            }`
          ),
          { recursive: true }
        );

        writeFileSync(
          `.luma/pages/server/${
            filePath.split("/")[filePath.split("/").length - 1]
          }`,
          readFileSync(filePath).toString()
        );
        writeFileSync(
          `.luma/pages/client/${
            filePath.split("/")[filePath.split("/").length - 1]
          }`,
          readFileSync(filePath).toString()
        );
        continue;
      }

      const getPath = (type: "client" | "server") =>
        path.join(`.luma/pages/${type}/`, relativePath.replace(".tsx", ".js"));

      const relativePath = path.relative(
        `${this.LumaConfig.source}/pages`,
        filePath
      );

      const outPathClient = getPath("client");
      const outPathServer = getPath("server");

      const cssBundle = relativePath.replace(".tsx", ".css");
      console.log(`[*] Building ${outPathClient}`);

      await this.compileServerPage(filePath, outPathServer);
      await this.compileClientPage(filePath, outPathClient);

      if (pageMapping[url]) {
        pageMapping[url].cssBundle ??= cssBundle;
        pageMapping[url].server.refs?.push(outPathServer);
        pageMapping[url].client.refs?.push(outPathClient);
      } else {
        pageMapping[url] = {
          cssBundle: relativePath.includes("layout") ? null : cssBundle,
          server: { refs: [outPathServer] },
          client: { refs: [outPathClient] },
        };
      }
    }

    writeFileSync(".luma/pages.json", JSON.stringify(pageMapping, null, 2));
  }

  private async compileServerPage(filePath: string, outfile: string) {
    return esbuild.build({
      ...EsbuildCommon.common,
      ...EsbuildCommon.server,
      ...EsbuildCommon.jsx,
      entryPoints: [filePath],
      outfile,
      plugins: [
        sassPlugin({ cssImports: true, type: "local-css" }),
        vanillaExtractPlugin(),
      ],
      banner: {
        js: `globalThis.window ??= undefined;`,
      },
    });
  }

  private async compileClientPage(filePath: string, outfile: string) {
    return esbuild.build({
      ...EsbuildCommon.common,
      ...EsbuildCommon.client,
      ...EsbuildCommon.jsx,

      plugins: [
        removeGetServerPropsPlugin,
        sassPlugin({ cssImports: true, type: "local-css" }),
        vanillaExtractPlugin(),
      ],
      entryPoints: [filePath],
      outfile,
      globalName: "__LUMA_ROOT__",
      format: "iife",
      inject: [path.resolve(__dirname, "static/luma-shim.js")],
      banner: {
        js: "window.__LUMA_FRAMEWORK__ ??= {};", // stub global framework instance if it does not yet exist
      },
    });
  }

  private async compileLayout() {
    console.log("[*] Building layout");

    return esbuild.build({
      ...EsbuildCommon.common,
      ...EsbuildCommon.server,
      ...EsbuildCommon.jsx,
      entryPoints: [`${this.LumaConfig.source}/pages/layout.tsx`],
      outfile: ".luma/pages/server/layout.js",
    });
  }

  private async compileCss() {}
}
