import { patch } from "reconciler/patch";
import { LumaCurrentComponent } from "shared/component/current";
import {
  LumaCurrentRootComponent,
  LumaCurrentWipComponent,
} from "shared/component/root";
import { registerDomHook, registerHook } from "shared/hooks/register";

function useState<T>(initialState: T): [T, Function] {
  registerDomHook("update", (oldNode, newNode) => {
    console.log("Component is updating");
  });

  registerHook(initialState);
  const component = LumaCurrentComponent.current!;

  function setState(newState: T) {
    patch(LumaCurrentRootComponent.current, LumaCurrentWipComponent.current);
  }

  return [component.hooks[component.hooks.length - 1], setState];
}

export { useState };
