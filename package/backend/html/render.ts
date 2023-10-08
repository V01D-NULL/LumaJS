import { VNode, h } from "snabbdom";
import { patch } from "reconciler/patch";
import {
  LumaCurrentRootComponent,
  LumaCurrentWipComponent,
} from "shared/component/root";

function render(node: VNode, container: Element | null) {
  if (!container) {
    throw new Error("container is null, cannot render without root!");
  }

  if (LumaCurrentRootComponent.current.elm) {
    throw new Error("Duplicate call to render");
  }

  LumaCurrentRootComponent.current = LumaCurrentWipComponent.current = patch(
    container,
    node
  );
}

export default render;
