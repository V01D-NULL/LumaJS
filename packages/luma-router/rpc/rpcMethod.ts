export abstract class RpcMethod {
  public name!: string;
  public abstract handler(...args: unknown[]): void;
}
