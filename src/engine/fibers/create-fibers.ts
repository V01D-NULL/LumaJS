import { Queue } from "../../lib/queue";
import { filterAndReturnFilteredOut } from "../../util/array";
import { BabelSource, Source } from "../dev/source";
import { FiberFlags } from "./fiber-flags";
import { BabelProp, Fiber } from "./fiber-type";

function createFiber(
  elem: string | Function,
  props: BabelProp | HTMLElement,
  children: Array<Fiber | string | number>
): Fiber {
  let attributes = props;
  let debugInformation = null;

  // Babel passes debugging attributes to `props` alongside
  // regular HTML (JSX) attributes, so we need to filter out debug info from attributes
  if ("__source" in props) {
    const { filtered, filteredOut: debug } = filterAndReturnFilteredOut(
      Object.entries(props),
      ([key]) => !["__self", "__source"].includes(key)
    );

    attributes = Object.fromEntries(filtered) as HTMLElement & BabelSource;
    debugInformation = Object.fromEntries(debug).__source;
  }

  return {
    type: elem,
    flags: FiberFlags.NONE,
    children: children.filter((x) => x !== null && x !== undefined),
    hookQueue: new Queue(),
    hooks: [],
    memoizedState: [],
    attributes: attributes,
    _source: debugInformation,
  };
}

export { createFiber };
