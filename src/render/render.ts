import { Component } from "../dom/component";
import { IVirtualDomComponent } from "../interfaces/virtual-dom";
import getComponentClassInstance from "../util/cached-component";
import { diffFibers } from "../util/virtual-dom-diffing";
import { FiberEngine } from "./fiber/fibers";

/**
 * @abstract Renders the virtual dom tree to the real DOM
 */
export class Renderer {
  private initialized: boolean = false;
  private root_component: any;

  public render = (rootComponent: any, root: Element): void => {
    if (this.initialized) {
      console.error(
        "Render: A call to render has been previously been made. Subsequent calls to render() are superflous because this Framework will manage the applications state"
      );

      return;
    }

    if (!(rootComponent?.prototype instanceof Component)) {
      console.error(
        "Cannot render class that does not inherit from 'Component'"
      );
      return;
    }

    // Render the virtual dom and populate the fibers
    this.initialized = true;
    this.root_component = rootComponent;
    rootComponent = getComponentClassInstance(rootComponent);
    this.craftVirtualComponent(rootComponent.render());

    // Append the root fiber to the real dom (i.e. render the entire tree)
    const { dom } = FiberEngine.rootFiber();
    root.append(dom);

    // // setInterval
    setTimeout(() => {
      FiberEngine.update();
      FiberEngine.setDiffingState(true);

      // This is where the diffing algorithm will run.
      // It will check each component and compare it against the shadow DOM in the fibers. If there are any differences, it will update the real DOM
      const rootComponent = getComponentClassInstance(this.root_component);
      this.craftVirtualComponent(rootComponent.render());

      const { dom } = FiberEngine.rootFiber();
      root.append(dom);

      const originalFiber = FiberEngine.getFibers(); // This is the original fiber
      const newFiber = FiberEngine.getDiffingFibers(); // This fiber was just created

      const diff = diffFibers(originalFiber, newFiber);
      console.log("DIFF: ", diff);

      FiberEngine.setDiffingState(false);
    }, 3000);
  };

  // Generate a virtual dom component
  public craftVirtualComponent = ({
    component,
    props,
    children,
  }: IVirtualDomComponent): Element => {
    const htmlElement = document.createElement(component);
    const properties = Object.keys(props ?? {});

    properties.forEach((property): void => {
      const { property: key, value } = {
        property,
        value: (<any>props)[property],
      };

      htmlElement.setAttribute(key, value);

      // Quick hack to get onclick working
      if (key === "onClick")
        htmlElement.onclick = function (e) {
          value(e);
        };
    });

    children?.forEach((child: string | any): void => {
      // Child can be either text or a nested component
      const childComponent =
        typeof child === "string" ? child : this.craftVirtualComponent(child);

      htmlElement.append(childComponent);
    });

    return htmlElement;
  };
}
