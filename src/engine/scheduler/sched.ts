import { LinkedList } from "../../lib/linked-list";
import { Fiber, FiberTree, FiberTrees } from "../fibers/fiber-type";

const Fibers: FiberTrees = {
  Active: new LinkedList<Fiber>(),
  WorkInProgress: null,
};

const fibs = new LinkedList();

function addFiber(fiber: any) {
  // console.log("new", fiber);
  Fibers.Active.prepend(fiber);
  // console.log(Fibers.Active.toArray(), "---", fiber);

  // fibs.prepend(fiber);

  Fibers.WorkInProgress = null;
}

function addWorkInProgressFiber(fiber: Fiber) {
  Fibers.WorkInProgress = fiber;
}

function retrieveWorkInProgressFiber() {
  return Fibers.WorkInProgress;
}

function registerActiveFibers(fiber: FiberTree) {
  Fibers.Active = fiber;
}

function retrieveActiveFibers() {
  // console.log(Fibers.Active);
  // return fibs;
  return Fibers.Active;
}

function gfibs() {
  return fibs.toArray();
}

export {
  registerActiveFibers,
  retrieveActiveFibers,
  addFiber,
  addWorkInProgressFiber,
  retrieveWorkInProgressFiber,
  gfibs,
};
