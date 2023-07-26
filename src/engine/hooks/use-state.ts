import { retrieveRecentlyUsedFiber } from "../scheduler/sched";
import {
  getHookOwner,
  mapHookToOwner,
} from "./internal/hook-component-mapping";

type UseState<S> = [S, (newValue: S) => void];

function useState<S>(initialState: S): UseState<S> {
  const setState = (newValue: S) => {
    const { owner, queuePosition } = getHookOwner(setState);
    const state = owner.memoizedState.raw.at(queuePosition);

    console.log("Owner of this setState callback:", owner);
    console.log(`Changing value from ${state} to ${newValue}`);
  };

  const fiber = retrieveRecentlyUsedFiber();
  fiber.memoizedState.enqueue(initialState);
  const hookQueuePosition = fiber.hookQueue.enqueue(setState);

  // Associate this setState callback with the current fiber
  mapHookToOwner(setState, { queuePosition: hookQueuePosition, owner: fiber });

  return [initialState, setState];
}

export { useState };
