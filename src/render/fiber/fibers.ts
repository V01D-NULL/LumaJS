import { IVirtualDomComponent } from "../../interfaces/virtual-dom";
import hashCode from "../../util/hash-code";

export interface IFiber {
  domComponent: IVirtualDomComponent;
  dom: Element;
  hash?: number;
  state?: any;
}

export namespace FiberEngine {
  const fibers: Array<IFiber> = []; // Todo: linked list

  let diffingState: boolean = false;
  const diffingFibers: Array<IFiber> = [];

  export const addFiberToDiff = (fiber: IFiber): void => {
    diffingFibers.push(fiber);
  };

  export const getDiffingFibers = (): Array<IFiber> => {
    return diffingFibers;
  };

  // export const applyFibers = (): void => {
  //   fibers.length = 0;
  // };

  export const addFiber = (fiber: IFiber): void => {
    // Initialize the fiber with a hash and observable (auto-tracking)
    if (!fiber?.hash) {
      const obersvable = fiber.domComponent.props?.state;
      const hash = hashCode(JSON.stringify(fiber));
      fiber = { ...fiber, hash, state: obersvable };
    }

    // Save to generic fiber list
    fibers.push(fiber);
  };

  export const getFibers = (): Array<IFiber> => {
    return fibers;
  };

  export const rootFiber = (): IFiber => {
    return fibers[fibers.length - 1];
  };

  export const setDiffingState = (state: boolean): void => {
    diffingState = state;
    if (!state) diffingFibers.length = 0;
  };

  export const getDiffingState = (): boolean => {
    return diffingState;
  };
}
