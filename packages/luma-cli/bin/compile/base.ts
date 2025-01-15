import path from "node:path";
import EsbuildCommon from "./config/esbuild-common";
import { getPageFiles } from "./utils";
import esbuild from "esbuild";
import { removeGetServerPropsPlugin } from "./config/esbuild-plugins";

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

    // Build individual page files
    for (const filePath of this.pages) {
      const getPath = (type: "client" | "server") =>
        path.join(`.luma/pages/${type}/`, relativePath.replace(".tsx", ".js"));

      const relativePath = path.relative(
        `${this.LumaConfig.source}/pages`,
        filePath
      );

      const outPathClient = getPath("client");
      const outPathServer = getPath("server");

      console.log(`[*] Building ${outPathClient}`);

      await this.compileServerPage(filePath, outPathServer);
      await this.compileClientPage(filePath, outPathClient);
    }
  }

  private async compileServerPage(filePath: string, outfile: string) {
    return esbuild.build({
      ...EsbuildCommon.common,
      ...EsbuildCommon.server,
      ...EsbuildCommon.jsx,
      entryPoints: [filePath],
      outfile,
    });
  }

  private async compileClientPage(filePath: string, outfile: string) {
    return esbuild.build({
      ...EsbuildCommon.common,
      ...EsbuildCommon.client,
      ...EsbuildCommon.jsx,

      plugins: [removeGetServerPropsPlugin],
      entryPoints: [filePath],
      outfile,
      globalName: "__LUMA_ROOT__",
      format: "iife",
      inject: [path.resolve(__dirname, "static/luma-shim.js")],
      banner: {
        js: "if (!window.__LUMA_FRAMEWORK__) window.__LUMA_FRAMEWORK__ = {};", // stub global framework instance if it does not yet exist
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
}
