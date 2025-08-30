import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import fs from "fs";
import { respondOk } from "./util/respond";
import { PageMapping } from "./types/pageMapping.types";

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
  const { default: ServerComponent, getServerProps } = require(serverPath);

  const serverProps = await getServerProps?.({
    searchParams: urlObj.searchParams,
    uri: urlObj.pathname,
  });

  const clientBundle = fs.readFileSync(clientPath).toString();

  respondOk(
    reply,
    clientBundle,
    serverProps,
    ServerComponent,
    LayoutComponent,
    page.cssBundle
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
    errorConfig.cssBundle ?? ""
  );
}

async function createServer(): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: {
      // transport: {
      //   target: "pino-pretty",
      // },
    },
  });

  // Handle favicon requests
  fastify.get(
    "/favicon.ico",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.code(204).send();
    }
  );

  // Handle all other routes
  fastify.get("/*", async (request: FastifyRequest, reply: FastifyReply) => {
    const allPages = JSON.parse(fs.readFileSync(".luma/pages.json").toString());

    // Handle CSS files
    if (request.url && request.url.endsWith(".css")) {
      try {
        const fileContents = fs
          .readFileSync(`.luma/pages/server${request.url}`)
          .toString();

        reply.type("text/css");
        return reply.send(fileContents);
      } catch (err) {
        console.error("CSS file not found:", request.url);
        return reply.code(404).send("CSS file not found");
      }
    }

    try {
      const page: PageMapping = allPages[request.url];

      if (!page) {
        await renderErrorPage(
          reply,
          true,
          allPages["/_error"],
          request.url,
          null
        );
        return;
      }

      if (!page.server.refs) {
        throw new Error("no refs for page");
      }

      await renderPage(request.url, reply, page);
    } catch (err: any) {
      fastify.log.error("Encountered exception: ", err);
      await renderErrorPage(
        reply,
        false,
        allPages["/_error"],
        request.url,
        err
      );
    }
  });

  return fastify;
}

// For AWS Lambda
let serverInstance: FastifyInstance | null = null;

const getServerInstance = async (): Promise<FastifyInstance> => {
  if (!serverInstance) {
    serverInstance = await createServer();
    await serverInstance.ready();
  }
  return serverInstance;
};

// For local development
const startServer = async (port?: number, host?: string) => {
  const defaultPort = 3000;
  const defaultHost = "localhost";

  try {
    const fastify = await createServer();

    await fastify.listen({
      port: port ?? defaultPort,
      host: host ?? defaultHost,
    });

    console.log(
      `Server running at http://${host ?? defaultHost}:${port ?? defaultPort}/`
    );
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

export { startServer, getServerInstance };
