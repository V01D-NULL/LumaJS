// import http from "http";
// import fs from "fs";

// const ErrorMapping = {
//   ENOENT: { code: 404, message: "Not Found" },
// };

// const server = http.createServer(async (req, res) => {
//   if (req.url === "/favicon.ico" || !req.url) {
//     return res.end();
//   }

//   try {
//     const routeFile = fs.readdirSync("./dist/pages" + req.url)[0];
//     const url = req.url.replace(/\//g, "");
//     const path = `./pages/${url}/${routeFile}`;

//     const { ssrComponent } = await import(path);

//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("<!DOCTYPE html><html><body>" + ssrComponent() + "</body></html>");
//   } catch (e: any) {
//     const { code, message } = ErrorMapping[e.code as keyof typeof ErrorMapping];
//     res.writeHead(code, { "Content-Type": "text/html" });
//     res.end(`<h1>${code} ${message}</h1>`);
//   }
// });

// server.listen(3000, () => {
//   console.log("Server running at http://localhost:3000/");
// });

import { startServer } from "luma-router";

startServer();
