import { getServerInstance } from "./instance";
import { RpcMethod } from "./rpc/rpcMethod";

const startServer = async ({
  port,
  host,
  rpcMethods,
}: {
  port?: number;
  host?: string;
  rpcMethods?: RpcMethod[];
}) => {
  const defaultPort = 3000;
  const defaultHost = "localhost";

  try {
    const serverInstance = await getServerInstance(rpcMethods);

    await serverInstance.listen({
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
