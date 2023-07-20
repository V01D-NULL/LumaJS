import {
  retrieveActiveFibers,
  retrieveRecentlyUsedFiber,
  retrieveWorkInProgressFiber,
} from "../scheduler/sched";

type UseState<S> = [S, (newValue: S) => void];

function useState<S>(initialState: S): UseState<S> {
  const setState = (newValue: S) => {
    console.log(
      "Fibers subscribed to this hook:",
      newValue,
      retrieveActiveFibers().toArray(),
      retrieveWorkInProgressFiber()
    );
  };

  const fiber = retrieveRecentlyUsedFiber();
  fiber.memoizedState = initialState;
  fiber.hookQueue.push(setState);

  return [initialState, setState];
}

export { useState };
