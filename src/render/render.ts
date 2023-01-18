import { IVirtualDomComponent } from "../interfaces/virtual-dom";
import { MutationObserver } from "./observer/mutation-observer";

/**
 * @abstract Manages state of both real and virtual dom components and renders any changes
 */
export class Renderer {
  private initialized: boolean = false;
  private virtualDom: IVirtualDomComponent = {} as IVirtualDomComponent;
  private mutationObserver: MutationObserver = new MutationObserver();

  public render = (layout: IVirtualDomComponent, root: Element) => {
    if (this.initialized) {
      console.error(
        "Render: A call to render has been previously been made. Subsequent calls to render() are superflous because this Framework will manage the applications state"
      );

      return;
    }

    this.mutationObserver.trackDom(root, { subtree: true, childList: true });
    root.append(this.renderComponents(layout));
    this.initialized = true;
  };

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
     *   This handles a case in which the dom component we want to render is a function returning some JSX
     */
    if (typeof component === "function") {
      const patchedComponent: IVirtualDomComponent = (component as Function)(
        props
      );

      component = patchedComponent.component;
      props = patchedComponent.props;
      children = patchedComponent.children || [];
    }

    const domComponent: IVirtualDomComponent = {
      component: component,
      props: props,
      children: [...children],
    };

    console.log("Got vDom:", domComponent);

    this.virtualDom = domComponent;
    return domComponent;
  };

  private renderComponents = ({
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
    });

    children?.forEach((child: string | any): void => {
      // Child can be either text or a nested component
      const childComponent =
        typeof child === "string" ? child : this.renderComponents(child);

      htmlElement.append(childComponent);
    });

    return htmlElement;
  };
}
