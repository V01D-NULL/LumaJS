import { VNode } from "snabbdom";
declare function useMount(callback: (node: VNode) => void | (() => void)): void;
export { useMount };
