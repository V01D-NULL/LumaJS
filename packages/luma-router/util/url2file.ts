import fs from "fs";

export function url2filepath(
  requestUrl: string
): [string, string, string | undefined] {
  const directoryListing = fs.readdirSync(".luma/pages/server" + requestUrl);

  const routeFile =
    requestUrl === "/"
      ? directoryListing.find(
          (file) => file.endsWith(".js") && file !== "layout.js"
        )
      : directoryListing[0];

  const url = requestUrl.replace(/\//g, "");
  const path = `./pages/server/${url}/${routeFile}`;
  return [url, path, routeFile];
}
