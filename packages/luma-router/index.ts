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
    const routeFile = fs.readdirSync(".luma/pages/server" + req.url)[0];
    const url = req.url.replace(/\//g, "");
    const path = `./pages/server/${url}/${routeFile}`;

    const DefaultExport = await import(path);
    const { ssrComponent } = DefaultExport;

    const clientBundle = fs
      .readFileSync(".luma/pages/client/" + url + "/" + routeFile)
      .toString();

    respondOk(res, ssrComponent, clientBundle);
  } catch (e: any) {
    console.log("error", e);
    const { code, template } =
      ErrorMapping[e.code as keyof typeof ErrorMapping];

    respondError(res, code, template ?? { code: 500, template: Page500 });
  }
});

const startServer = () =>
  server.listen(3000, () =>
    console.log("Server running at http://localhost:3000/")
  );

export { startServer };
