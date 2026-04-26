import { RpcMethod } from "luma-router/rpc";

/*
 *     Dummy RPC handler to showcase rpc usage. This is invoked on the server only
 */
export class ExampleRpc implements RpcMethod {
  public name = "example-rpc";

  // RPC Methods can be async or sync and return any value.
  public async handler(event: { message: string }) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Received RPC message:", event);
    return { my: "response" };
  }
}
