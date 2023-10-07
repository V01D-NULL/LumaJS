import { registerDomHook } from "shared/hooks/register";
import { VNode } from "snabbdom";

function useMount(callback: (node: VNode) => void | (() => void)) {
  registerDomHook("create", callback);
}

export { useMount };
