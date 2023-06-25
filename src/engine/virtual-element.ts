class VirtualElement {
  element: string = "root";
  children: any;
  attributes?: HTMLElement;

  private _internal: {
    topLevelComponent: Function;
  };
  // updater (used by hooks in setState())

  constructor(
    elem: string | Function,
    children: Array<VirtualElement> | undefined,
    attributes: HTMLElement | undefined,
    topLevel: NonNullable<Function>
  ) {
    // if (typeof elem === "function") this.__rootComponent = elem;
    // else this.element = elem;
    this.element = elem as string;

    if (children) this.children = children;
    if (attributes) this.attributes = attributes;

    // Reference to the component passed into render().
    // This helps find the root component so that we can invoke it for background processing with fibers
    // (aka perform reconciliation with createElement)
    // console.log("TOP", topLevel);

    this._internal = { topLevelComponent: topLevel };
  }

  get reconcile(): VirtualElement {
    return this._internal.topLevelComponent();
  }
}

export { VirtualElement };
