import type { ServerResponse } from "http";
import fs from "fs";

function respondOk(
  res: ServerResponse,
  ssrComponent: Function,
  clientBundle: string
) {
  const frameworkBundle = fs.readFileSync(".luma/client.js", {
    encoding: "utf-8",
    flag: "r",
  });

  const body = ssrComponent();

  // TODO: Add a layout.tsx file to replace the hardcoded HTML/head/body tags
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <script>${frameworkBundle}</script>
        <script>${clientBundle}</script>
      </head>
      <body>
        ${body}
      </body>
    </html>
  `;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

function respondError(res: ServerResponse, code: number, template: string) {
  res.writeHead(code, { "Content-Type": "text/html" });
  res.end(template);
}

export { respondOk, respondError };
