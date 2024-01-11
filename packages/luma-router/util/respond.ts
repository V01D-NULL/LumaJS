import type { ServerResponse } from "http";

function respondOk(res: ServerResponse, ssrComponent: Function) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<!DOCTYPE html><html><body>" + ssrComponent() + "</body></html>");
}

function respondError(res: ServerResponse, code: number, template: string) {
  res.writeHead(code, { "Content-Type": "text/html" });
  res.end(template);
}

export { respondOk, respondError };
