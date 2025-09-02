const RPC_URL = "/json-rpc" as const;

export async function makeRpcCall(
  name: string,
  params?: Record<string, string | number | boolean>
) {
  const request = new Request(RPC_URL, {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: name,
      params,
    }),
  });

  const response = await fetch(request);
  const json = await response.json();

  if (response.status !== 200) {
    console.error("RPC Call failed:", json);
  }

  return json;
}
