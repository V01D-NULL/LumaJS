import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default (fastify: FastifyInstance) =>
  fastify.get(
    "/favicon.ico",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.code(204).send();
    }
  );
