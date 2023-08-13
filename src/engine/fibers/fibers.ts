import { Fiber, FiberTrees } from "./fiber-type";

const Fibers: FiberTrees = {
  Active: null,
  WorkInProgress: null,
};

function setActiveFiber(fiber: Fiber) {
  Fibers.Active = fiber;
}

function setWorkInProgressFiber(fiber: Fiber) {
  Fibers.WorkInProgress ??= fiber;
}

function getFibers(): FiberTrees {
  return Fibers;
}

export { setActiveFiber, setWorkInProgressFiber, getFibers };
