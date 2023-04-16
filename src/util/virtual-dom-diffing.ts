import { IFiber } from "../render/fiber/fibers";
import hashCode from "./hash-code";

// Util to help generate a diff between two fibers
export const diffFibers = (
  oldFibers: Array<IFiber>,
  newFibers: Array<IFiber>
): Array<IFiber> => {
  const diff: Array<IFiber> = [];

  for (let i in oldFibers) {
    const oldHash = hashCode(JSON.stringify(oldFibers[i].domComponent));
    const newHash = hashCode(JSON.stringify(newFibers[i].domComponent));

    if (oldHash !== newHash) diff.push(newFibers[i]);
  }

  const differentLength = newFibers.length !== oldFibers.length;
  if (differentLength) {
    // const smaller = newFibers.length < oldFibers.length ? newFibers : oldFibers;

    if (newFibers.length < oldFibers.length) {
      console.log("new fiber is smaller", oldFibers.slice(newFibers.length));
    } else {
      console.log("old fiber is smaller", newFibers.slice(oldFibers.length));
    }
  }

  return diff;
};
