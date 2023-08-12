import { Fiber, FiberTrees } from "./fiber-type";

const Fibers: FiberTrees = {
  Active: null,
  WorkInProgress: null,
  RecentlyUsed: null,
};

function addFiber(fiber: any) {
  Fibers.Active = fiber;
}

function addWorkInProgressFiber(fiber: Fiber) {
  Fibers.WorkInProgress ??= fiber;
}

function retrieveWorkInProgressFiber() {
  return Fibers.WorkInProgress;
}

function registerActiveFibers(fiber: Fiber) {
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
