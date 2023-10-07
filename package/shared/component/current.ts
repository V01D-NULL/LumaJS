import { Hooks as DomHooks, VNode } from "snabbdom";

type CurrentComponent = {
  current: {
    node: VNode;
    domHooks: DomHooks;
  } | null;
};

// Globally exposes the Function Component being processed by createElement
// This enables Luma to share the state of the Function Component with any hooks it might have
const LumaCurrentComponent: CurrentComponent = {
  current: null,
};

export { LumaCurrentComponent };
