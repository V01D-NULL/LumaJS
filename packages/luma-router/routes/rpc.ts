import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RpcServer } from "../rpc/json-rpc";

export default (fastify: FastifyInstance) =>
  fastify.post(
    "/json-rpc",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const result = await RpcServer.receiveJSON(request.body as string);
        reply.status(200).send(result);
      } catch (e) {
        console.log(e);
        reply.status(500).send("RPC call failed");
      }
    }
  );
