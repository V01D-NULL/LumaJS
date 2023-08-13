import { reRender } from "../../dom/render";
import { buildFiberTree } from "../fibers/build";
import { FiberFlags, markFiberFlags } from "../fibers/fiber-flags";
import { Fiber } from "../fibers/fiber-type";
import { getFibers } from "../fibers/fibers";
import { resetHookIdx } from "../hooks/hooks";

function reconcile() {
  const { WorkInProgress, Active } = getFibers();

  resetHookIdx();
  markFiberFlags(WorkInProgress, FiberFlags.RECONCILING);

  const newVdom = buildFiberTree(WorkInProgress) as Fiber;
  const currentVdom = Active;

  // TODO: `newVdom` returns the div, not the root component.
  //       Need to make sure `newVdom` is it's parent before doing stuff like below (good time to implement fiber._owner?)
  // newVdom.hooks = currentVdom.hooks;

  console.log("NEW", newVdom);
  console.log("CURR", currentVdom);

  // 1. diff
  //  1.2 Figure out if Luma can surgically update DOM node or need to tear down tree
  //
  // 2. Reset fiber flags

  // requestAnimationFrame(() => reRender());
}

export { reconcile };
