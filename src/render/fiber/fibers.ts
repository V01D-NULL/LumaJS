import { IVirtualDomComponent } from "../../interfaces/virtual-dom";
import hashCode from "../../util/hash-code";

export interface IFiber {
  domComponent: IVirtualDomComponent;
  dom: Element;
  hash?: number;
  state?: any;
}

export namespace FiberEngine {
  const watchedFibers: Array<IFiber> = []; // Todo: Priority queue
  const fibers: Array<IFiber> = []; // Todo: linked list

  let diffingState: boolean = false;
  const diffingFibers: Array<IFiber> = [];

  export const addFiberToDiff = (fiber: IFiber): void => {
    diffingFibers.push(fiber);
  };

  export const getDiffingFibers = (): Array<IFiber> => {
    return diffingFibers;
  };

  export const addFiber = (fiber: IFiber): void => {
    // Initialize the fiber with a hash and observable (auto-tracking)
    if (!fiber?.hash) {
      const obersvable = fiber.domComponent.props?.state;
      const hash = hashCode(JSON.stringify(fiber));
      fiber = { ...fiber, hash, state: obersvable };
    }

    // Save to generic fiber list
    fibers.push(fiber);

    // Start tracking this fiber if it has a watchable property
    if (fiber.state) {
      console.log("listening to fiber #", fiber);
      watchedFibers.push(fiber);
    }
  };

  export const getFibers = (): Array<IFiber> => {
    return fibers;
  };

  export const rootFiber = (): IFiber => {
    return fibers[fibers.length - 1];
  };

  export const setDiffingState = (state: boolean): void => {
    diffingState = state;
  };

  export const getDiffingState = (): boolean => {
    return diffingState;
  };

  export const update = (): Array<IFiber> | void => {
    if (watchedFibers.length > 0) {
      return processFiber();
    }
  };

  const processFiber = (): Array<IFiber> => {
    const fibersToUpdate = watchedFibers.reduce((prev: any, curr: any) => {
      if (fiberNeedsUpdate(curr)) {
        const newHash = hashCode(JSON.stringify(curr));
        curr = { ...curr, hash: newHash };

        console.log("(new) Preparing to update fiber #", curr.hash);
        return [...prev, curr];
      }
    }, []);

    return fibersToUpdate ?? [];
  };

  const fiberNeedsUpdate = (originalFiber: IFiber): boolean => {
    const oldHash = originalFiber.hash;
    const newHash = hashCode(JSON.stringify(originalFiber));
    return oldHash !== newHash;
  };
}

// export default FiberEngine;
