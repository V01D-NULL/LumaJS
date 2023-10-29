import "snabbdom";

declare module "snabbdom" {
  interface VNodeData {
    luma: {
      debug: DebugProps;
      component: string;
      reconcileComponent: () => VNode;
    };
  }
}
