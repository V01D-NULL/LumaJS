import { createFiber } from "../engine/fibers/create-fibers";

function createElement(
  type: string | Function,
  props?: HTMLElement,
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
