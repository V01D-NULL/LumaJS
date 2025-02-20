import type { ServerResponse } from "http";
import fs from "fs";
import { htmlify } from "./htmlify";

function respondOk(
  res: ServerResponse,
  clientBundle: string,
  serverProps: any,
  component: ({ props }: { props: any }) => any /* VNode */,
  layout: ({ children }: { children: any }) => any /* VNode */
) {
  const frameworkBundle = fs.readFileSync(".luma/framework.js", {
    encoding: "utf-8",
    flag: "r",
  });

  const html = `
    <!DOCTYPE html>
    ${htmlify(
      layout({
        children: component(serverProps),
      })
    )}
    <script>window.__LUMA_SSR_PROPS__ = ${JSON.stringify(serverProps)}</script>
    <script>${frameworkBundle}</script>
    <script>${clientBundle}</script>
  `;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

function respondError(res: ServerResponse, code: number, template: string) {
  res.writeHead(code, { "Content-Type": "text/html" });
  res.end(template);
}

export { respondOk, respondError };
