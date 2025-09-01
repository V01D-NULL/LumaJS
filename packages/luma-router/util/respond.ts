import fs from "fs";
import { htmlify } from "./htmlify";
import { FastifyReply } from "fastify";
import * as cheerio from "cheerio";
import { Metadata } from "../types/metadata.types";

function respondOk(
  res: FastifyReply,
  clientBundle: string,
  serverProps: any,
  component: ({ props }: { props: any }) => any /* VNode */,
  layout: ({ children }: { children: any }) => any /* VNode */,
  cssBundle: string,
  meta: Metadata | null
) {
  const frameworkBundle = fs.readFileSync(".luma/framework.js", {
    encoding: "utf-8",
    flag: "r",
  });

  const $ = cheerio.load(
    htmlify(
      layout({
        children: component(serverProps),
      })
    )
  );

  $("head").append(
    `<head>
      <link
        href="./${cssBundle}"
        type="text/css"
        rel="stylesheet"
      />
    </head>`
  );

  $("body").append(
    `<script>window.__LUMA_SSR_PROPS__ = ${JSON.stringify(serverProps)}</script>
    <script>${frameworkBundle}</script>
    <script>${clientBundle}</script>
    `
  );

  if (meta) {
    if (meta.title) {
      $("head").prepend(`<title>${meta.title}</title>`);
    }
    if (meta.description) {
      $("head").append(
        `<meta name="description" content="${meta.description}"/>`
      );
    }
    if (meta.keywords) {
      $("head").append(
        `<meta name="keywords" content="${meta.keywords.join(", ")}"/>`
      );
    }
    if (meta.og) {
      Object.entries(meta.og).forEach(([key, value]) => {
        $("head").append(`<meta property="og:${key}" content="${value}"/>`);
      });
    }
  }

  res.type("text/html").status(200).send($.html());
}

export { respondOk };
