import { LumaCurrentComponent } from "shared/component/current";
import { VNode, VNodeChildElement, h } from "snabbdom";

function createElement(
  type: string | ((...args: any[]) => VNode),
  props: any,
  ...children: VNodeChildElement[]
) {
  if (type instanceof Function) {
    LumaCurrentComponent.current = {} as any;
    const fc = type(props, children);
    fc.data!.hook = { ...LumaCurrentComponent.current?.domHooks };
    LumaCurrentComponent.current = null;
    return fc;
  }

  return h(type, props, children);
}

export { createElement };
