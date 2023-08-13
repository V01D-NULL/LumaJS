import { Queue } from "../../lib/queue";
import { filterAndReturnFilteredOut } from "../../util/array";
import { Source } from "../dev/source";
import { FiberFlags } from "./fiber-flags";
import { Fiber } from "./fiber-type";

function createFiber(elem, props, children): Fiber {
  let attributes = props;
  let debugInformation = null;

  // Babel passes debugging attributes to `props` alongside
  // regular HTML (JSX) attributes, so we need to filter out debug info from attributes
  if (props?.__source !== undefined) {
    const { filtered, filteredOut: debug } = filterAndReturnFilteredOut(
      Object.entries(props),
      ([key]) => !["__self", "__source"].includes(key)
    );

    attributes = Object.fromEntries(filtered);
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
