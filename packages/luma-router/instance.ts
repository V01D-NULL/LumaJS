import Fastify, { FastifyInstance } from "fastify";
import fastifySensible from "@fastify/sensible";
import { Routes } from "./routes";
import { renderErrorPage } from "./process";
import fs from "node:fs";

let serverInstance: FastifyInstance | null = null;

const getServerInstance = async (): Promise<FastifyInstance> => {
  if (!serverInstance) {
    serverInstance = await createServer();
    await serverInstance.ready();
  }
  return serverInstance;
};

const ENVIRONMENTS = ["development", "production", "test"] as const;
type NodeEnv = (typeof ENVIRONMENTS)[number];

const envToLogger: Record<NodeEnv, unknown> = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

async function createServer(): Promise<FastifyInstance> {
  const nodeEnv = (process.env.NODE_ENV ?? "development") as NodeEnv;
  const fastify = Fastify({
    logger: envToLogger[nodeEnv] ?? true,
  });

  await fastify.register(fastifySensible);
  await fastify.register(async function appScope(app) {
    Routes.favicon(app);
    Routes.wildcard(app);

    const allPages = JSON.parse(fs.readFileSync(".luma/pages.json").toString());

    app.setErrorHandler((error, request, reply) => {
      console.log("Got error", error, error.statusCode);

      if (error.statusCode && [302, 301].includes(error.statusCode)) {
        return reply.redirect(error.message, error.statusCode);
      }

      return renderErrorPage(
        reply,
        error.statusCode === 404,
        allPages["/_error"],
        request.url,
        null
      );
    });
  });

  return fastify;
}

export { getServerInstance };
