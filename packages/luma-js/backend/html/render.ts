import { VNode } from "snabbdom";
import { reconcile } from "../../reconciler/reconcile";
import { LumaCurrentRootComponent } from "../../shared/component/root";

function render(node: VNode, container: Element | null) {
  if (container === null) {
    throw new Error("container is null, cannot render without root!");
  }

  if (LumaCurrentRootComponent.current.elm) {
    throw new Error("Duplicate call to render");
  }

  LumaCurrentRootComponent.current = reconcile(container, node);
}

export default render;
