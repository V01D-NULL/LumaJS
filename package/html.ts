import render from "backend/html/render";
import { LumaJS } from "shared/luma";
import Hooks from "backend/html/hooks";
import { VNode } from "snabbdom";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }

  type DebugProps = {
    source: any;
    self: any;
  };
}
declare module "snabbdom" {
  interface VNodeData {
    luma: {
      debug: DebugProps;
      component: string;
      reconcileComponent: () => VNode;
    };
  }
}

export default {
  ...LumaJS,
  ...Hooks,
  render,
};
