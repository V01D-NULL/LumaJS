import { IVirtualDomComponent } from "./virtual-dom";

export interface IFramework {
  createElement: (
    component: string,
    props?: Object,
    ...children: Array<Object>
  ) => IVirtualDomComponent;

  render: (layout: IVirtualDomComponent, root: Element) => void;
}
