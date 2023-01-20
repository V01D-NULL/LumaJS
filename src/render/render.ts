import { Component } from "../dom/component";
import { IVirtualDomComponent } from "../interfaces/virtual-dom";

/**
 * @abstract Renders the virtual dom tree to the real DOM
 */
export class Renderer {
  private initialized: boolean = false;

  public render = (rootComponent: any, root: Element): void => {
    if (this.initialized) {
      console.error(
        "Render: A call to render has been previously been made. Subsequent calls to render() are superflous because this Framework will manage the applications state"
      );

      return;
    }

    if (!(rootComponent.prototype instanceof Component)) {
      console.error(
        "Cannot render class that does not inherit from 'Component'"
      );
      return;
    }

    // Create an instance of a class that will return the JSX it should render
    rootComponent = new (<typeof rootComponent>rootComponent)();

    this.initialized = true;
    root.append(this.renderComponents(rootComponent.render()));
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
