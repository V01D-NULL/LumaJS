import {
  gfibs,
  retrieveActiveFibers,
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

  const fiber = retrieveWorkInProgressFiber();
  fiber.memoizedState = initialState;
  fiber.hookQueue.push(setState);

  return [initialState, setState];
}

export { useState };
