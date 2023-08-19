import { Fiber } from "../engine/fibers/index";
import { __build, buildFiberTree } from "../engine/fibers/build";
import { resetHookIdx } from "../engine/hooks/hooks";
import { logDebug } from "../engine/dev/log-debug";
import { setActiveFiber } from "../engine/fibers/fibers";
import { FiberFlags, unmarkFiberFlags } from "../engine/fibers/fiber-flags";

let isInitialRender = true;

let currentRoot = null;
let currentElement = null;

function render(element, container) {
  if (!isInitialRender) {
    console.error("render method has already been called");
    return;
  }

  resetHookIdx();
  currentRoot = container;
  currentElement = element;

  // [X] Step 1: Separate rendering using generator
  // [ ] Step 2: Integrate that into requestIdleCallback
  // [ ] Step 3: Integrate that into hooks
  // [ ] Step 4: Reconcile

  const generator = __build(element);
  container.appendChild(paint(buildFiberTree(generator)));
  isInitialRender = false;

  setActiveFiber(currentElement);
  logDebug("Fiber root", currentElement);
}

function reRender(element = currentElement) {
  resetHookIdx();
  currentElement = element;

  // currentRoot.replaceChildren(paint(buildFiberTree(element) as Fiber));
}

function paint(fiber: Fiber) {
  const { type, children, attributes } = fiber;
  const htmlElement = document.createElement(type as any);

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
    const childComponent = typeof child !== "object" ? child : paint(child);
    htmlElement.append(childComponent);
  });

  return htmlElement;
}

export { render, reRender };
