import { Queue } from "../../lib/queue";
import { VirtualElement } from "../virtual-element";
import { Fiber } from "./fiber-type";

function createFiber(elem, props, children): Fiber {
  return {
    type: elem,
    functionalComponent: null,
    return: null,
    hookQueue: new Queue(),
    memoizedState: new Queue(),
    node: new VirtualElement(
      elem,
      children.filter((x) => x !== null && x !== undefined),
      props,
      null,
      null
    ),
  };
}

export { createFiber };
