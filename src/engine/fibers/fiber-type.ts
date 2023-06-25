import { LinkedList } from "../../lib/linked-list";
import { VirtualElement } from "../virtual-element";

type Dispatcher<A> = () => A;

// Individual fiber tree
type FiberTree = LinkedList<Fiber>;

// Collection of fiber tree's
interface FiberTrees {
  Active: FiberTree | null;
  WorkInProgress: FiberTree | null;
}

type Fiber = {
  type: VirtualElement | null;
  return: Fiber | null;
  hookQueue: Dispatcher<unknown>[];
};

export { Fiber, FiberTree, FiberTrees };
