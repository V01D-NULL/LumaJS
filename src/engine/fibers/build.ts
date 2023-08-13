import { createFiber } from "./create-fibers";
import { Fiber } from "./fiber-type";
import { setWorkInProgressFiber } from "./fibers";

function buildFiberTree(
  element: Fiber | string | number
): Fiber | string | number {
  if (typeof element === "string" || typeof element === "number") {
    return element;
  }

  if (typeof element.type === "function") {
    setWorkInProgressFiber(element);
    return buildFiberTree(element.type(element.attributes));
  }

  const children = element.children.flatMap((child) =>
    Array.isArray(child) ? child.map(buildFiberTree) : buildFiberTree(child)
  );

  return createFiber(element.type, element.attributes, children);
}

export { buildFiberTree };
