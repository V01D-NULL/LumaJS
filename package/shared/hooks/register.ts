import { LumaCurrentComponent } from "shared/component/current";

function registerDomHook(
  domHookName:
    | "pre"
    | "init"
    | "create"
    | "insert"
    | "prepatch"
    | "update"
    | "postpatch"
    | "destroy"
    | "remove"
    | "post",
  callback: (...args: any) => any
) {
  if (!LumaCurrentComponent.current) {
    throw new Error("Hooks can only be called inside of components");
  }

  LumaCurrentComponent.current.domHooks ??= {};
  LumaCurrentComponent.current.domHooks[domHookName] = callback;
}

function registerHook<T>(state: T) {
  if (!LumaCurrentComponent.current) {
    // throw new Error("Hooks can only be called inside of components");
  }

  // LumaCurrentComponent.current.hooks ??= [];
  // LumaCurrentComponent.current.hooks.push(state);
}

export { registerHook, registerDomHook };
