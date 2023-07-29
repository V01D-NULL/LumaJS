import { logDebug } from "../dev/log-debug";
import { createFiber } from "./create-fibers";
import { Fiber } from "./fiber-type";

function buildFiberTree(element: Fiber | string | number) {
  if (typeof element === "string" || typeof element === "number") {
    return element;
  }

  if (typeof element.type === "function") {
    return buildFiberTree(element.type(element.attributes));
  }

  const children = element.children.flatMap((child) =>
    Array.isArray(child) ? child.map(buildFiberTree) : buildFiberTree(child)
  );

  return createFiber(element.type, element.attributes, children);
}

export { buildFiberTree };
