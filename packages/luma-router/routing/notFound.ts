import { getServerInstance } from "../instance";

export async function notFound() {
  const fastify = await getServerInstance();
  throw fastify.httpErrors.notFound();
}
