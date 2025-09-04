import { JSONRPCClient } from "json-rpc-2.0";

const RPC_URL = "/json-rpc" as const;

const client = new JSONRPCClient((jsonRPCRequest) =>
  fetch(RPC_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jsonRPCRequest),
  }).then((response: any) => {
    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return response
        .json()
        .then((jsonRPCResponse: any) => client.receive(jsonRPCResponse));
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  })
);

export async function makeRpcCall(
  name: string,
  params?: Record<string, string | number | boolean>
) {
  return client.request(name, params);
}
