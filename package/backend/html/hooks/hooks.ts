import { dispatch } from "../../../reconciler/reconcile";
import { LumaCurrentComponent } from "../../../shared/component/current";

let hookIdx = 0;
const hooks: any = [];

function registerHook<T>(state: T): void {
  if (!LumaCurrentComponent.current) {
    throw new Error("Hooks can only be called inside of components");
  }

  hooks[hookIdx] ??= state;
}

function useState<T>(initialState: T): [T, Function] {
  registerHook(initialState);

  const idx = hookIdx;
  const component = LumaCurrentComponent.current!;

  function setState(newState: T | (() => T)) {
    hooks[idx] = newState instanceof Function ? newState() : newState;
    hookIdx = 0;
    dispatch(component);
  }

  return [hooks[hookIdx++], setState];
}

export { useState };
