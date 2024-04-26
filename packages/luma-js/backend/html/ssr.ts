import { VNode } from "snabbdom";
// @ts-ignore
import init from "snabbdom-to-html/init";
// @ts-ignore
import modules from "snabbdom-to-html/modules";

function ssrRender(node: VNode) {
  return htmlify(node);
}

function htmlify(node: VNode) {
  const toHTML = init([
    modules.class,
    modules.props,
    modules.attributes,
    modules.style,
  ]);

  return toHTML(node);
}

export default ssrRender;
