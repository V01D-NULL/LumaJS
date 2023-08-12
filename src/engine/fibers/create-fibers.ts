import { Queue } from "../../lib/queue";
import { FiberFlags } from "./fiber-flags";
import { Fiber } from "./fiber-type";

function createFiber(elem, props, children): Fiber {
  return {
    type: elem,
    flags: FiberFlags.NONE,
    children: children.filter((x) => x !== null && x !== undefined),
    hookQueue: new Queue(),
    hooks: [],
    memoizedState: [],
    attributes: props ?? {},
  };
}

export { createFiber };
