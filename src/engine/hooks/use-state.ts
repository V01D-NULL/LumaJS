import { retrieveActiveFibers } from "../scheduler/sched";

type UseState<S> = [S, (newValue: S) => void];

function useState<S>(initialState: S): UseState<S> {
  console.log("THIS", this);
  //   let state = initialState;
  const setState = (newValue: S) => {
    // state = newValue;
    console.log(
      "Fibers subscribed to this hook:",
      newValue,
      //   subscribedFibers.toArray(),
      retrieveActiveFibers()?.toArray()
    );
  };

  return [initialState, setState];
}

export { useState };
