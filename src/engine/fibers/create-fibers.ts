import { Queue } from "../../lib/queue";
import { FiberFlags } from "./fiber-flags";

function createFiber(elem, props, children): any {
  return {
    type: elem,
    flags: FiberFlags.NONE,
    children: children.filter((x) => x !== null && x !== undefined),
    hookQueue: new Queue(),
    memoizedState: [],
    attributes: props ?? {},
  };
}

export { createFiber };
