import { reconcile } from "../reconciler/reconciler";

interface IdleRequestCallbackDeadline {
  didTimeout: boolean;
  timeRemaining: () => number; // Float
}

function scheduleWork(deadline: IdleRequestCallbackDeadline) {
  reconcile();
  // requestIdleCallback(scheduleWork);
}

export { scheduleWork };
