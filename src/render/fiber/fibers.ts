import { IVirtualDomComponent } from "../../interfaces/virtual-dom";

interface IFiber {
  domComponent: IVirtualDomComponent;
  dom: Element;
}

const fibers: Array<IFiber> = [];

export namespace FiberEngine {
  const fibers: Array<IFiber> = [];

  export const addFiber = (fiber: IFiber): void => {
    fibers.push(fiber);
  };

  export const getFibers = (): Array<IFiber> => {
    return fibers;
  };

  export const rootFiber = (): IFiber => {
    return fibers[fibers.length - 1];
  };
}

// export default FiberEngine;
