import { reRender } from "../../dom/render";

function reconcile() {
  // Todo: actually reconcile
  requestAnimationFrame(() => reRender());
}

export { reconcile };
