import { RpcMethod } from "luma-router/rpc";

/*
 *     Dummy RPC handler to showcase rpc usage. This is invoked on the server only
 */
export class ExampleRpc implements RpcMethod {
  public name = "example-rpc";

  public handler(event: { message: string }) {
    console.log("Received RPC message:", event.message);
    return { my: "response" };
  }
}
