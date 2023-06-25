import { Fiber, createFiber } from "../engine/fibers/index";
import { addFiber, retrieveActiveFibers } from "../engine/scheduler/sched";
import { VirtualElement } from "../engine/virtual-element";

let appLayout: Function;

function render(layout: Fiber, root: Element) {
  root.append(perform(layout));

  // setTimeout(() => {
  //   if (init) return;
  //   init = true;
  //   console.log("recall render");
  //   // console.log("APP LAYOUT", retrieveActiveFibers()?.head?.element.reconcile);
  // }, 1000);
}

// Used by babel
function createElement(
  component: string | Function,
  props?: HTMLElement,
  ...children: Array<VirtualElement>
) {
  // Invoking component will trigger createElement on valid DOM nodes inside of functional components
  if (typeof component === "function") {
    if (!appLayout) appLayout = component; // Store the root component on the first render
    return component();
  }

  const virtualElement = new VirtualElement(
    component,
    children.filter((x) => x !== null && x !== undefined),
    props,
    appLayout
  );

  const { head } = retrieveActiveFibers();
  const fiber = createFiber();
  fiber.type = virtualElement;

  if (head) {
    head.return = fiber;
  }

  addFiber(fiber);
  return fiber;
}

function perform(fiber: Fiber) {
  const { element, children, attributes } = fiber.type;
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
    let childComponent = typeof child !== "object" ? child : perform(child);
    htmlElement.append(childComponent);
  });

  return htmlElement;
}

export { render, createElement };
