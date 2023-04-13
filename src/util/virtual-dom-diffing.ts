import { IFiber } from "../render/fiber/fibers";

// Util to help generate a diff between two fibers
export const diffFibers = (
  oldFibers: Array<IFiber>,
  newFibers: Array<IFiber>
): Array<IFiber> => {
  // TODO: This needs to diff *everything* in the fiber, not just the hash
  const diff: Array<IFiber> = [];

  oldFibers.forEach((oldFiber: IFiber) => {
    const newFiber = newFibers.find(
      (fiber: IFiber) => fiber.hash === oldFiber.hash
    );

    if (!newFiber) {
      diff.push(oldFiber);
    }
  });

  return diff;
};
