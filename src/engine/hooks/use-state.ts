import { logDebug } from "../dev/log-debug";
import { retrieveWorkInProgressFiber } from "../fibers/fibers";
import { scheduleWork } from "../scheduler/sched";
import { advanceToNextHook, getCurrentHookIdx } from "./hooks";

type UseState<S> = [S, (newValue: S) => void];

function useState<S>(initialValue: S): UseState<S> {
  const wip = retrieveWorkInProgressFiber();

  // The actual component will run a hook function, so we can return some basic data and quit
  // for now since the framework has not even run yet, thus there is no real data to work with
  if (wip === null) {
    logDebug(
      "Ignoring null wip fiber - this is likely an initial render",
      initialValue
    );
    return [initialValue, setState];
  }

  // createElement will call this function while traversing it, but at that point we also set the wip fiber
  // This is a very hack way of stopping createElement from tricking the hook into thinking there are more hooks in the component
  if (new Error().stack.includes("createElement")) {
    logDebug("Ignoring hook invocation from createElement");
    return [initialValue, setState];
  }

  const hooks = wip.hooks;
  const currentHook = getCurrentHookIdx();

  if (typeof hooks[currentHook] === "undefined") {
    wip.hooks[currentHook] = initialValue;
  }

  function setState(newValue: S) {
    wip.hooks[currentHook] = newValue;
    requestIdleCallback(scheduleWork);
  }

  advanceToNextHook();
  return [wip.hooks[currentHook], setState];
}

export { useState };
