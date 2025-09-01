import { reconcile } from "../../../reconciler/reconcile";
import { LumaCurrentComponent } from "../../../shared/component/current";
import { LumaCurrentRootComponent } from "../../../shared/component/root";

let hookIdx = 0;
const hooks: any = [];

function registerHook<T>(state: T): void {
  if (!LumaCurrentComponent.current) {
    throw new Error("Hooks can only be called inside of components");
  }

  hooks[hookIdx] ??= state;
}

let isRendering = false;
let pendingUpdates: Function[] = [];

function dispatch() {
  if (isRendering || typeof window === "undefined") return;
  isRendering = true;

  hookIdx = 0; // Reset after the render cycle
  const component =
    LumaCurrentRootComponent.current.data?.luma?.reconcileComponent();

  if (!component) {
    throw new Error("Component not found for reconciliation");
  }

  LumaCurrentRootComponent.current = reconcile(
    LumaCurrentRootComponent.current,
    component
  );
  isRendering = false;
}

function batchUpdates() {
  while (pendingUpdates.length > 0) {
    const update = pendingUpdates.shift();
    update?.();
  }
}

function useState<T>(initialState: T): [T, Function] {
  registerHook(initialState);
  const idx = hookIdx;

  function setState(newState: T | ((prev: T) => T)) {
    pendingUpdates.push(() => {
      hooks[idx] =
        newState instanceof Function ? newState(hooks[idx]) : newState;
      dispatch();
    });

    if (typeof window !== "undefined") {
      requestIdleCallback(batchUpdates);
    }
  }

  return [hooks[hookIdx++], setState];
}

function useEffect<T>(callback: () => T, deps: any[]): void {
  registerHook(deps);
  const idx = hookIdx;

  const oldDeps = hooks[hookIdx++];
  const shouldRunEffect =
    !oldDeps ||
    oldDeps.length !== deps.length ||
    !oldDeps.every((dep: any, idx: number) => dep === deps[idx]);
  if (shouldRunEffect) {
    hooks[idx] = deps;
    callback();
  }
}

function useId(): string {
  const uuid = crypto.randomUUID();
  return useState(uuid)[0];
}

function useRef<T>(initialValue: T): { current: T } {
  registerHook({ current: initialValue });
  return hooks[hookIdx++];
}

function createContext<T>(defaultValue: T) {
  const context = {
    value: defaultValue,
    Provider: ({
      children,
      value,
    }: {
      children: JSX.Element;
      value: T;
    }): JSX.Element => {
      context.value = value;
      return children;
    },
    Consumer: ({
      children,
    }: {
      children: (value: T) => JSX.Element;
    }): JSX.Element => {
      return children(context.value);
    },
  };

  return context;
}

function useContext<T>(context: { value: T }): T {
  if (!LumaCurrentComponent.current) {
    throw new Error("useContext can only be called inside of components");
  }

  return context.value;
}

export { useState, useEffect, useId, useRef, createContext, useContext };
