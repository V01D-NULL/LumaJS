import { Hooks as DomHooks, VNode } from "snabbdom";

type CurrentComponent = {
  current: VNode;
};

const LumaCurrentRootComponent: CurrentComponent = {
  current: {} as any,
};

const LumaCurrentWipComponent: CurrentComponent = {
  current: {} as any,
};

export { LumaCurrentRootComponent, LumaCurrentWipComponent };
