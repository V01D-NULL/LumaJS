import type { ServerResponse } from "http";
import fs from "fs";
import { htmlify } from "./htmlify";
import { FastifyReply } from "fastify";

function respondOk(
  res: FastifyReply,
  clientBundle: string,
  serverProps: any,
  component: ({ props }: { props: any }) => any /* VNode */,
  layout: ({ children }: { children: any }) => any /* VNode */,
  cssBundle: string
) {
  const frameworkBundle = fs.readFileSync(".luma/framework.js", {
    encoding: "utf-8",
    flag: "r",
  });

  const html = `
    <!DOCTYPE html>
    <head>
      <link
        href="./${cssBundle}"
        type="text/css"
        rel="stylesheet"
      />
    </head>
    ${htmlify(
      layout({
        children: component(serverProps),
      })
    )}
    <script>window.__LUMA_SSR_PROPS__ = ${JSON.stringify(serverProps)}</script>
    <script>${frameworkBundle}</script>
    <script>${clientBundle}</script>

  `;

  res.type("text/html").status(200).send(html);
}

export { respondOk };
