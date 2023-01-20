import { IVirtualDomComponent } from "../interfaces/virtual-dom";
import { Renderer } from "../render/render";
import getComponent from "../util/cached-component";
import { Component } from "./component";

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
    props?: Object,
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
      props = patchedComponent.props;
      children = patchedComponent.children || [];
    }

    /*
     *   This handles a case in which the dom component we want to render is a function (or class with a render function) returning some JSX
     *   If it's a class, it will be the actual class, not an instance so we have to create a new instance and allocate it.
     */
    if (typeof component === "function") {
      let patchedComponent: IVirtualDomComponent;
      const isClass = (<any>component).prototype instanceof Component;

      if (isClass) patchedComponent = getComponent(component)?.render();
      else patchedComponent = (component as Function)(props);

      component = patchedComponent.component;
      props = patchedComponent.props;
      children = patchedComponent.children || [];
    }

    const domComponent: IVirtualDomComponent = {
      component: component,
      props: props,
      children: [...children],
    };

    console.log("virtual dom component:", domComponent);

    // this.virtualDom = domComponent;
    return domComponent;
  };
}

export default Dom;
