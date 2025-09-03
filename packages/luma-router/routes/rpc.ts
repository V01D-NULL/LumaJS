import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { JSONRPCRequest } from "json-rpc-2.0";
import { RpcServer } from "../rpc/json-rpc";

export default (fastify: FastifyInstance) =>
  fastify.post(
    "/json-rpc",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const result = await RpcServer.receive(request.body as JSONRPCRequest);
        reply.status(200).send(result);
      } catch (e) {
        fastify.log.error(e);
        reply.status(500).send("RPC call failed");
      }
    }
  );
