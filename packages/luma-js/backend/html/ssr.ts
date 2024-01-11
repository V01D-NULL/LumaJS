import { VNode } from "snabbdom";
import { reconcile } from "../../reconciler/reconcile";
import { LumaCurrentRootComponent } from "../../shared/component/root";
// @ts-ignore
import init from "snabbdom-to-html/init";
// @ts-ignore
import modules from "snabbdom-to-html/modules";

function ssrRender(node: VNode, container: VNode | null) {
  if (container === null) {
    throw new Error("container is null, cannot render without root!");
  }

  if (LumaCurrentRootComponent.current.elm) {
    throw new Error("Duplicate call to render");
  }

  LumaCurrentRootComponent.current = reconcile(container, node);
}

function preRender(node: VNode) {
  const toHTML = init([
    modules.class,
    modules.props,
    modules.attributes,
    modules.style,
  ]);

  return toHTML(node);
}

export default ssrRender;
export { preRender };
