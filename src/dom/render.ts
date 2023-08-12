import { Fiber } from "../engine/fibers/index";
import { buildFiberTree } from "../engine/fibers/build";
import { resetHookIdx } from "../engine/hooks/hooks";
import { logDebug } from "../engine/dev/log-debug";

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

  container.appendChild(paint(buildFiberTree(element)));
  isInitialRender = false;
  logDebug("Fiber root", currentElement);
}

function reRender(element = currentElement) {
  resetHookIdx();
  currentElement = element;

  currentRoot.replaceChildren(paint(buildFiberTree(element)));
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
