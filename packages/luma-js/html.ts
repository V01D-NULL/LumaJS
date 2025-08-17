import render from "./backend/html/render";
import { LumaJS } from "./shared/luma";
import { VNode, VNodeData } from "snabbdom";
import { hydrateRoot } from "./reconciler/hydrate";

export { render };
export * from "./backend/html/hooks";
export * from "./types/ssr.types";

export default {
  ...LumaJS,
  render,
  __LUMA_INTERNAL__: { hydrateRoot },
};

type PrimitiveChild = string | number | boolean | null | undefined;
type Child = JSX.Element | PrimitiveChild;
type Children = Child | Child[];

type HostComponent = Pick<
  VNodeData,
  "props" | "attrs" | "class" | "style" | "on" | "dataset" | "key"
> & { children?: Children };

declare global {
  namespace JSX {
    type Element = VNode;

    interface ElementChildrenAttribute {
      children: {};
    }

    // Based on the tag list in github:DefinitelyTyped/DefinitelyTyped:React
    interface IntrinsicElements {
      [elemName: string]: HostComponent; // catch-all for now
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
