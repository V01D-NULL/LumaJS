import http from "http";
import fs from "fs";
import { respondError, respondOk } from "./util/respond";
import { Page404 } from "./html/404";
import { Page500 } from "./html/500";

const ErrorMapping = {
  ENOENT: { code: 404, template: Page404 },
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/favicon.ico" || !req.url) {
    return res.end();
  }

  try {
    const directoryListing = fs.readdirSync(".luma/pages/server" + req.url);

    const routeFile =
      req.url === "/"
        ? directoryListing.find(
            (file) => file.endsWith(".js") && file !== "layout.js"
          )
        : directoryListing[0];

    const url = req.url.replace(/\//g, "");
    const path = `./pages/server/${url}/${routeFile}`;

    const { ssrComponent } = await import(path);

    const clientBundle = fs
      .readFileSync(".luma/pages/client/" + url + "/" + routeFile)
      .toString();

    const layoutFilePath = "./pages/server/layout.js";
    const DefaultExportLayout = (await import(layoutFilePath)).default;

    respondOk(res, ssrComponent, clientBundle, DefaultExportLayout.default);
  } catch (e: any) {
    console.log("error", e);
    const { code, template } = ErrorMapping[
      e.code as keyof typeof ErrorMapping
    ] ?? { code: 500, template: Page500 };

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
