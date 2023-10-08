import { LumaCurrentComponent } from "shared/component/current";
import { VNode, VNodeChildElement, h } from "snabbdom";

function createElement(
  type: string | ((...args: any[]) => VNode),
  props: any,
  ...children: VNodeChildElement[]
) {
  if (type instanceof Function) {
    LumaCurrentComponent.new({ ref: type.name } as any);
    const fc = type(props, children);
    fc.data!.hook = { ...LumaCurrentComponent.current?.domHooks };
    LumaCurrentComponent.delete();
    return fc;
  }

  return h(type, props, children);
}

export { createElement };
