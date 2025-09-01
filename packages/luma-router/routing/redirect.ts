import { getServerInstance } from "../instance";

export async function redirect(url: string) {
  const fastify = await getServerInstance();
  throw fastify.httpErrors.createError(302, url);
}
