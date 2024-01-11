import http from "http";
import fs from "fs";
import { respondError, respondOk } from "./util/respond";

const ErrorMapping = {
  ENOENT: { code: 404, message: "Not Found" },
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/favicon.ico" || !req.url) {
    return res.end();
  }

  try {
    const routeFile = fs.readdirSync("./dist/pages" + req.url)[0];
    const url = req.url.replace(/\//g, "");
    const path = `./pages/${url}/${routeFile}`;

    const { ssrComponent } = await import(path);

    respondOk(res, ssrComponent);
  } catch (e: any) {
    const { code, message } = ErrorMapping[e.code as keyof typeof ErrorMapping];
    respondError(res, code, message);
  }
});

const startServer = () =>
  server.listen(3000, () =>
    console.log("Server running at http://localhost:3000/")
  );

export { startServer };
