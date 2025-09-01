import { getServerInstance } from "./instance";

const startServer = async (port?: number, host?: string) => {
  const defaultPort = 3000;
  const defaultHost = "localhost";

  try {
    const serverInstance = await getServerInstance();

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
