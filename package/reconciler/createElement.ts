import { VNodeChildElement, h } from "snabbdom";

function createElement(
  type: string | Function,
  props: any,
  ...children: VNodeChildElement[]
) {
  if (type instanceof Function) return type(props, children);
  return h(type, props, children);
}

export { createElement };
