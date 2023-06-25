import { LinkedList } from "../../lib/linked-list";
import { Fiber, FiberTree, FiberTrees } from "../fibers/fiber-type";

const Fibers: FiberTrees = {
  Active: new LinkedList<Fiber>(),
  WorkInProgress: null,
};

function addFiber(fiber: Fiber) {
  Fibers.Active.prepend(fiber);
}

function registerActiveFibers(fiber: FiberTree) {
  Fibers.Active = fiber;
}

function retrieveActiveFibers() {
  return Fibers.Active;
}

export { registerActiveFibers, retrieveActiveFibers, addFiber };
