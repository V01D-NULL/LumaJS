import { logDebug } from "../dev/log-debug";
import { FiberFlags } from "../fibers/fiber-flags";
import { getFibers } from "../fibers/fibers";
import { scheduleWork } from "../scheduler/sched";
import { advanceToNextHook, getCurrentHookIdx } from "./hooks";

type UseState<S> = [S, (newValue: S) => void];

function useState<S>(initialValue: S): UseState<S> {
  const { WorkInProgress: wip } = getFibers();

  // The actual component will run a hook function, so we can return some basic data and quit
  // for now since the framework has not even run yet, thus there is no real data to work with
  if (wip === null) {
    logDebug(
      "Ignoring null 'WorkInProgress' fiber - this is likely an initial render"
    );
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
