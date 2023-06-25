import { LinkedList } from "../../lib/linked-list";
import { VirtualElement } from "../virtual-element";
import { Fiber } from "./fiber-type";

function createFiber(): Fiber {
  return {
    type: null,
    return: null,
    hookQueue: [],
  };
}

// function createFiberTreeFromRoot(element: VirtualElement) {
//   const fibers = new LinkedList<Fiber>();

//   // Recursively traverse child elements to build the Fiber tree
//   const recurse = (elem: VirtualElement) => {
//     for (let child of elem.children) {
//       if (VirtualElement.prototype.isPrototypeOf(child)) {
//         const newFiber = createFiber();
//         newFiber.element = newFiber;
//         newFiber.return = fibers.toArray()[fibers.toArray().length - 1]!; // Should just be a doubly linked list tbh.
//         newFiber.type = child;

//         fibers.append(newFiber);
//         recurse(child);
//       }
//     }
//   };

//   const newFiber = createFiber();
//   newFiber.element = newFiber;
//   newFiber.type = element;
//   fibers.append(newFiber);

//   recurse(element);

//   return fibers;
// }

export { createFiber };
