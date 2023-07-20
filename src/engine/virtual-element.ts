import { Fiber } from "./fibers/fiber-type";

class VirtualElement {
  element: string = "root";
  children: any;
  attributes?: HTMLElement;

  private _internal: {
    topLevelComponent: Function;
    owner: Fiber;
  };
  // updater (used by hooks in setState())

  constructor(
    elem: string,
    children: Array<VirtualElement> | undefined,
    attributes: HTMLElement | undefined,
    topLevel: NonNullable<Function>,
    owner: NonNullable<Fiber>
  ) {
    // if (typeof elem === "function") this.__rootComponent = elem;
    // else this.element = elem;
    this.element = elem;

    if (children) this.children = children;
    if (attributes) this.attributes = attributes;

    // Reference to the component passed into render().
    // This helps find the root component so that we can invoke it for background processing with fibers
    // (aka perform reconciliation with createElement)
    // console.log("TOP", topLevel);

    this._internal = { topLevelComponent: topLevel, owner };
    if (owner) owner.node = this;
  }

  get reconcile(): VirtualElement {
    return this._internal.topLevelComponent();
  }
}

export { VirtualElement };
