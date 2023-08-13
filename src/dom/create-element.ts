import { createFiber } from "../engine/fibers/create-fibers";
import { BabelProp } from "../engine/fibers/fiber-type";

function createElement(
  type: string | Function,
  props?: BabelProp,
  ...children: Array<any>
) {
  const fiber = createFiber(type, props, children);
  if (typeof type === "function") {
    fiber.children.push(type(props));
  } else {
    fiber.children = children;
  }

  return fiber;
}

export { createElement };
