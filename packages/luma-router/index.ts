import http from "http";
import fs from "fs";
import { respondOk } from "./util/respond";
import { PageMapping } from "./types/pageMapping.types";

async function renderPage(
  requestUrl: string,
  res: http.ServerResponse<http.IncomingMessage>,
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
  const { default: ServerComponent, getServerProps } = require(serverPath);

  const serverProps = await getServerProps?.({
    searchParams: urlObj.searchParams,
    uri: urlObj.pathname,
  });

  const clientBundle = fs.readFileSync(clientPath).toString();

  respondOk(
    res,
    clientBundle,
    serverProps,
    ServerComponent,
    LayoutComponent,
    page.cssBundle
  );
}

async function renderErrorPage(
  res: http.ServerResponse<http.IncomingMessage>,
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
    res,
    clientBundle,
    serverProps,
    ServerComponent,
    LayoutComponent,
    errorConfig.cssBundle ?? ""
  );
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/favicon.ico" || !req.url) {
    return res.end();
  }

  console.log(`[${req.method?.toUpperCase()}] ${req.url}`);
  const allPages = JSON.parse(fs.readFileSync(".luma/pages.json").toString());
  try {
    const page: PageMapping = allPages[req.url];
    if (!page) {
      if (!req.url.endsWith(".css")) {
        await renderErrorPage(res, true, allPages["/_error"], req.url, null);
        return;
      }

      const fileContents = fs
        .readFileSync(`.luma/pages/server/${req.url}`)
        .toString();

      return res.end(fileContents);
    }

    if (!page.server.refs) {
      throw new Error("no refs for page");
    }

    await renderPage(req.url, res, page);
  } catch (err: any) {
    console.error("Encountered exception: ", err);
    return await renderErrorPage(res, false, allPages["/_error"], req.url, err);
  }
});

const startServer = (port?: number, callback?: () => void) => {
  const defaultPort = 3000;
  const defaultCallback = () =>
    console.log(`Server running at http://localhost:${port ?? defaultPort}/`);

  server.listen(port ?? defaultPort, callback ?? defaultCallback);
};

export { startServer };
