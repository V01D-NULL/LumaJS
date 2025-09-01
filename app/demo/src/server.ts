import { startServer, getServerInstance } from "luma-router";

// Lambda handler
const handler = async (event: any, context: any) => {
  const fastify = await getServerInstance();

  // Convert API Gateway event to Fastify-compatible format
  const response = await fastify.inject({
    method: event.httpMethod || event.requestContext?.http?.method || "GET",
    url: event.path || event.rawPath || "/",
    query: event.queryStringParameters || {},
    headers: event.headers || {},
    payload: event.body || undefined,
  });

  return {
    statusCode: response.statusCode,
    headers: response.headers,
    body: response.payload,
    isBase64Encoded: false,
  };
};

if (process.env.SERVERLESS === "false") {
  startServer();
}

export { handler };
