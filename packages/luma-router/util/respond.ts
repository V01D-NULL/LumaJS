import type { ServerResponse } from "http";

function respondOk(res: ServerResponse, ssrComponent: Function) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<!DOCTYPE html><html><body>" + ssrComponent() + "</body></html>");
}

function respondError(res: ServerResponse, code: number, message: string) {
  res.writeHead(code, { "Content-Type": "text/html" });
  res.end(`<h1>${code} ${message}</h1>`);
}

export { respondOk, respondError };
