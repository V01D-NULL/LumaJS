import http from "http";
import fs from "fs";
import { respondError, respondOk } from "./util/respond";
import { Page404 } from "./html/404";
import { Page500 } from "./html/500";
import { htmlify } from "./util/htmlify";
import { url2filepath } from "./util/url2file";

const ErrorMapping = {
  ENOENT: { code: 404, template: Page404 },
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/favicon.ico" || !req.url) {
    return res.end();
  }

  try {
    const [url, path, routeFile] = url2filepath(req.url);

    const layoutFilePath = "./pages/server/layout.js";
    const { default: LayoutComponent } = await import(layoutFilePath);
    const { default: ServerComponent, getServerProps } = await import(path);

    const serverProps = await getServerProps();

    const clientBundle = fs
      .readFileSync(".luma/pages/client/" + url + "/" + routeFile)
      .toString();

    respondOk(
      res,
      clientBundle,
      serverProps,
      ServerComponent.default,
      LayoutComponent.default
    );
  } catch (e: any) {
    console.log("error", e);

    const err = ErrorMapping[e.code as keyof typeof ErrorMapping];
    const { code, template } = err ?? {
      code: 500,
      template: Page500,
    };

    respondError(res, code, template);
  }
});

const startServer = (port?: number, callback?: () => void) => {
  const defaultCallback = () =>
    console.log("Server running at http://localhost:3000/");

  const defaultPort = 3000;

  server.listen(port ?? defaultPort, callback ?? defaultCallback);
};

export { startServer };
