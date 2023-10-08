import "snabbdom";

declare module "snabbdom" {
  interface VNodeData {
    luma: {
      hooks: any[];
      debug: DebugProps;
      fc: string;
    };
  }
}
