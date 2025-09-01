import { FastifyReply } from "fastify";
import { PageMapping } from "./types/pageMapping.types";
import { respondOk } from "./util/respond";
import fs from "node:fs";

async function renderPage(
  requestUrl: string,
  reply: FastifyReply,
  page: PageMapping
) {
  if (!page.server.refs || !page.client.refs) {
    throw new Error("No refs for page");
  }

  if (!page.cssBundle) {
    throw new Error("No css bundle for page");
  }

  const urlObj = new URL(requestUrl, "luma://base"); // base url is irrelevant

  const serverPath = `./${page.server.refs[0].slice("./luma".length)}`;
  const clientPath = page.client.refs[0];

  if (!serverPath || !clientPath) {
    throw new Error(
      `Cannot find server or client ref for page ${requestUrl.toLowerCase()}`
    );
  }

  const layoutFilePath = "./pages/server/layout.js";
  const { default: LayoutComponent } = require(layoutFilePath);
  const {
    default: ServerComponent,
    getServerProps,
    generateMetadata,
    metadata,
  } = require(serverPath);

  console.log("before");
  const serverProps = await getServerProps?.({
    searchParams: urlObj.searchParams,
    uri: urlObj.pathname,
  });
  console.log("after");

  const meta =
    metadata ||
    (await generateMetadata?.({ searchParams: urlObj.searchParams })) ||
    null;
  const clientBundle = fs.readFileSync(clientPath).toString();

  respondOk(
    reply,
    clientBundle,
    serverProps,
    ServerComponent,
    LayoutComponent,
    page.cssBundle,
    meta
  );
}

async function renderErrorPage(
  reply: FastifyReply,
  is404Error: boolean,
  errorConfig: PageMapping,
  requestUrl: string,
  err: Error | null
) {
  if (!errorConfig.server.refs || !errorConfig.client.refs) {
    throw new Error("No refs found in error config."); // Should never happen. If it does, it's a bug in luma-cli
  }

  const serverPageRef = errorConfig.server.refs.find((ref) =>
    ref.endsWith(is404Error ? "404.page.js" : "error.page.js")
  );
  const clientPageRef = errorConfig.client.refs.find((ref) =>
    ref.endsWith(is404Error ? "404.page.js" : "error.page.js")
  );

  if (!serverPageRef || !clientPageRef) {
    throw new Error(
      "No error page found in _error. Did you forget to add error pages?"
    );
  }

  const path = `./${serverPageRef.split("/").slice(1).join("/")}`;
  const { default: ServerComponent, getServerProps } = require(path);

  const layoutFilePath = "./pages/server/layout.js";
  const { default: LayoutComponent } = require(layoutFilePath);

  const searchParams = new URLSearchParams();
  if (err) {
    searchParams.append("errorMessage", err.message);
  }

  const serverProps = await getServerProps?.({
    searchParams,
    uri: requestUrl,
  });

  const clientBundle = fs.readFileSync(clientPageRef).toString();

  respondOk(
    reply,
    clientBundle,
    serverProps,
    ServerComponent,
    LayoutComponent,
    errorConfig.cssBundle ?? "",
    null
  );
}

export { renderPage, renderErrorPage };
