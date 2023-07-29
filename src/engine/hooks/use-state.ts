// import { reRender } from "../../dom/render";
// import { FiberFlags, markFiberFlags } from "../fibers/fiber-flags";
// import {
//   retrieveActiveFibers,
//   retrieveRecentlyUsedFiber,
//   retrieveWorkInProgressFiber,
// } from "../fibers/fibers";
import { reconcile } from "../reconciler/reconciler";
import { scheduleWork } from "../scheduler/sched";

type UseState<S> = [S, (newValue: S) => void];

let hooks = [];
let currentHook = 0;

function setCurrentHook(val) {
  currentHook = val;
}

function getCurrentHook() {
  return currentHook;
}

function getHooks() {
  return hooks;
}

function useState<S>(initialValue: S): UseState<S> {
  if (typeof hooks[currentHook] === "undefined") {
    hooks[currentHook] = initialValue;
  }

  let hookIndex = currentHook;
  function setState(newValue) {
    hooks[hookIndex] = newValue;
    requestIdleCallback(scheduleWork);
  }

  return [hooks[currentHook++], setState];
}

export { useState, setCurrentHook, getCurrentHook, getHooks };
