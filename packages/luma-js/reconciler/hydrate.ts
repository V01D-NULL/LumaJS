import { VNode } from "snabbdom";
import { reconcile } from "./reconcile";
import { LumaCurrentRootComponent } from "../shared/component/root";

function hydrateRoot(
  oldVnode: VNode | Element | DocumentFragment,
  vnode: VNode
) {
  if (oldVnode === null) {
    throw new Error("container is null, cannot render without root!");
  }

  if (LumaCurrentRootComponent.current.elm) {
    throw new Error("Duplicate call to render");
  }

  LumaCurrentRootComponent.current = reconcile(oldVnode, vnode);
  return LumaCurrentRootComponent.current;
}

export { hydrateRoot };
