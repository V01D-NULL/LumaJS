import { Hooks as DomHooks, VNode } from "snabbdom";

type CurrentComponent = {
  current: CurrentSingular | null;
  stack: CurrentSingular[];
};

type CurrentSingular = {
  ref: string;
  node: VNode;
  domHooks: DomHooks;
  hooks: any[];
};

type ComponentStackHelpers = {
  new: (current: CurrentSingular) => void;
  delete: () => void;
};

type LumaComponentStack = CurrentComponent & ComponentStackHelpers;

// Globally exposes the Function Component being processed by createElement
// This enables Luma to share the state of the Function Component with any hooks it might have
const LumaCurrentComponent: LumaComponentStack = {
  current: null,
  stack: [],

  new(current: CurrentSingular) {
    this.stack.push(current);
    this.current = current;
  },

  delete() {
    this.stack.pop();
    this.current = this.stack[this.stack.length - 1] ?? null;
  },
};

export { LumaCurrentComponent };
