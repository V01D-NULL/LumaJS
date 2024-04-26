import type { ServerResponse } from "http";
import fs from "fs";

function respondOk(
  res: ServerResponse,
  ssrComponent: () => [Function, any /* VNode */],
  clientBundle: string,
  layout: ({ children }: { children: any }) => any /* VNode */
) {
  const frameworkBundle = fs.readFileSync(".luma/client.js", {
    encoding: "utf-8",
    flag: "r",
  });

  const [htmlify, node] = ssrComponent();

  const html = `
    <!DOCTYPE html>
    ${htmlify(layout({ children: node }))}
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
