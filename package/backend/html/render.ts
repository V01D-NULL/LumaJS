import { VNode, h } from "snabbdom";
import { patch } from "reconciler/patch";

function render(node: VNode, container: Element | null) {
  if (!container) {
    console.error("container is null, cannot render without root!");
    return;
  }

  patch(container, node);
}

export default render;
