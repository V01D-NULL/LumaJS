import { Fiber, createFiber } from "../engine/fibers/index";
import {
  addFiber,
  addWorkInProgressFiber,
  gfibs,
  retrieveActiveFibers,
  retrieveWorkInProgressFiber,
} from "../engine/scheduler/sched";
import { VirtualElement } from "../engine/virtual-element";
import { LinkedList } from "../lib/linked-list";

function render(layout: Fiber, root: Element) {
  root.append(perform(layout.node));
  // console.log(retrieveActiveFibers().toArray());
}

function createElement(
  component: string | Function,
  props?: HTMLElement,
  ...children: Array<VirtualElement>
) {
  const list: LinkedList<Fiber> = retrieveActiveFibers();

  const fiber = createFiber(
    typeof component === "function" ? component.name : component,
    props,
    children
  );
  addWorkInProgressFiber(fiber);

  if (typeof component === "function") {
    fiber.node.children.push(component(props).node);
  } else {
    fiber.node.children = children;
  }

  if (list.head) {
    list.head.return = fiber;
  }

  addFiber(fiber);
  return fiber;
}

function perform(fiber: VirtualElement) {
  const { element, children, attributes } = fiber;
  const htmlElement = document.createElement(element);

  const attributeKeys = Object.keys(attributes ?? {});

  attributeKeys.forEach((attrib): void => {
    const { attrib: key, value } = {
      attrib,
      value: attributes[attrib as keyof HTMLElement] as any,
    };

    if (key.startsWith("on")) {
      htmlElement.addEventListener(key.substring(2).toLowerCase(), value);
    } else {
      htmlElement.setAttribute(key, value);
    }
  });

  children?.forEach((child: string | any): void => {
    let childComponent =
      typeof child !== "object"
        ? child
        : perform(child.node ? child.node : child); // Sometimes children are either type Fiber or VirtualElement. I could dig deeper and fix it but this works fine.

    htmlElement.append(childComponent);
  });

  return htmlElement;
}

export { render, createElement };
