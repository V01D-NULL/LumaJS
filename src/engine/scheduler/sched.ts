import { LinkedList } from "../../lib/linked-list";
import { Fiber, FiberTree, FiberTrees } from "../fibers/fiber-type";

const Fibers: FiberTrees = {
  Active: new LinkedList<Fiber>(),
  WorkInProgress: null,
  RecentlyUsed: null,
};

function addFiber(fiber: any) {
  Fibers.Active.prepend(fiber);
}

function addWorkInProgressFiber(fiber: Fiber) {
  Fibers.WorkInProgress ??= fiber;
}

function retrieveWorkInProgressFiber() {
  return Fibers.WorkInProgress;
}

function registerActiveFibers(fiber: FiberTree) {
  Fibers.Active = fiber;
}

function retrieveActiveFibers() {
  return Fibers.Active;
}

function addRecentlyUsedFiber(fiber: Fiber) {
  Fibers.RecentlyUsed = fiber;
}

function retrieveRecentlyUsedFiber() {
  return Fibers.RecentlyUsed;
}

export {
  addFiber,
  addRecentlyUsedFiber,
  addWorkInProgressFiber,
  registerActiveFibers,
  retrieveActiveFibers,
  retrieveWorkInProgressFiber,
  retrieveRecentlyUsedFiber,
};
