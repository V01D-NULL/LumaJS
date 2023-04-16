import { IProps, IVirtualDomComponent } from "../interfaces/virtual-dom";
import { Renderer } from "../render/render";
import getComponentClassInstance from "../util/cached-component";
import { Component } from "./component";
import { FiberEngine } from "../render/fiber/fibers";

class Dom {
  private renderer: Renderer;

  constructor() {
    this.renderer = new Renderer();
  }

  public createRoot() {
    return this.renderer;
  }

  // Used by babel
  public createElement = (
    component: string,
    props?: IProps,
    ...children: Array<Object>
  ): IVirtualDomComponent => {
    /*
     *   This handles a niche case where the we pass a custom component to the render function:
     *   render(<My Component />, ...);
     *   The 'component' argument will contain the actual contents of the component (i.e. an Object/virtual dom component) instead of a string.
     *   In order to avoid passing weird data to the render routine we simply update the virtual dom arguments to reflect a valid state here by copying valid data into the arguments
     */
    if (typeof component === "object") {
      const patchedComponent: IVirtualDomComponent = component;
      component = patchedComponent.component;
      props = patchedComponent?.props;
      children = patchedComponent.children || [];
    }

    /*
     *   This handles a case in which the dom component we want to render is a function (or class with a render function) returning some JSX
     *   If it's a class, it will be the actual class, not an instance so we have to create a new instance and allocate it.
     */
    if (typeof component === "function") {
      let patchedComponent: IVirtualDomComponent;
      const isClass = (component as any).prototype instanceof Component;

      if (isClass) {
        const instance = getComponentClassInstance(component);

        if ((component as any).prototype?.deprecated) {
          console.warn(
            (component as any).prototype.constructor.name,
            "is deprecated. Use of this component is ill-advised"
          );
        }

        instance.props = props;
        patchedComponent = instance?.render();
      } else {
        patchedComponent = (component as Function)(props);
      }
      component = patchedComponent.component;
      children = patchedComponent.children || [];
      props = patchedComponent.props;
    }

    const { onClick } = props || {};

    const domComponent: IVirtualDomComponent = {
      component: component,
      props: props,
      children: [...children],
      eventListeners: onClick,
    };

    // if (FiberEngine.getDiffingState()) {
    // const existingFibers = FiberEngine.getFibers();
    // existingFibers.forEach((fiber: any) => {
    //   let tmpFiber: IFiber = {
    //     domComponent,
    //     dom: this.renderer.craftVirtualComponent(domComponent),
    //   };

    //   const obersvable = tmpFiber.domComponent.props?.state;
    //   const hash = hashCode(JSON.stringify(tmpFiber));
    //   tmpFiber = { ...tmpFiber, hash, state: obersvable };

    //   if (tmpFiber.hash === fiber.hash) {
    //     console.log("Fiber already exists");
    //     return;
    //   }

    //   // console.log("tmpFiber", tmpFiber);
    //   // console.log("fiber", fiber);
    // });

    //   FiberEngine.addFiberToDiff({
    //     domComponent,
    //     dom: this.renderer.craftVirtualComponent(domComponent),
    //   });

    //   return domComponent;
    // }

    FiberEngine.addFiber({
      domComponent,
      dom: this.renderer.craftVirtualComponent(domComponent),
    });

    // console.log(
    //   "fibers:",
    //   FiberEngine.getFibers().map((fiber: any) => fiber.dom),
    //   FiberEngine.getFibers().map((fiber: any) => fiber.domComponent)
    // );

    return domComponent;
  };
}

export default Dom;
