import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { renderPage } from "../process";
import { PageMapping } from "../types/pageMapping.types";
import fs from "node:fs";

export default (fastify: FastifyInstance) =>
  fastify.get("/*", async (request: FastifyRequest, reply: FastifyReply) => {
    // TODO: Move this into a separate route (/static ?)
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

    const allPages = JSON.parse(fs.readFileSync(".luma/pages.json").toString());
    const page: PageMapping = allPages[request.url];

    if (!page) {
      return reply.notFound();
    }

    if (!page.server.refs) {
      fastify.log.error("No refs for server page");
      return reply.notFound();
    }

    await renderPage(request.url, reply, page);
  });
