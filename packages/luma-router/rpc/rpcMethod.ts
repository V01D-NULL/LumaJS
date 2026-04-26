export abstract class RpcMethod {
  public abstract name: string;
  public abstract handler(
    params: Record<string, unknown>,
  ): Promise<unknown> | unknown;
}
