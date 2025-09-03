import type { VNode } from "snabbdom";
import type { Ref } from "../types/refObj.types";

export function withRef<T>(ref: Ref<T>, onRefUpdate?: (ref: Ref<T>) => void) {
  const setRef = (value: unknown) => {
    if (value === null || value instanceof Node) {
      ref.current = value as T;
      onRefUpdate?.(ref);
    }
  };

  return {
    hook: {
      insert(vnode: VNode) {
        setRef(vnode.elm);
      },
      update(_: VNode, vnode: VNode) {
        setRef(vnode.elm);
      },
      remove(_: VNode, done: () => void) {
        setRef(null);
        done();
      },
      destroy(_: VNode) {
        setRef(null);
      },
    },
  };
}
