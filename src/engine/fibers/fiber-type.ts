import { LinkedList } from "../../lib/linked-list";
import { VirtualElement } from "../virtual-element";

type Dispatcher<A> = (...args: any[]) => A | void;

// Individual fiber tree
type FiberTree = LinkedList<Fiber>;

// Collection of fiber tree's
interface FiberTrees {
  Active: FiberTree | null;
  WorkInProgress: Fiber | null;
  RecentlyUsed: Fiber | null;
}

type Fiber = {
  type: string | null;
  functionalComponent: string | null;
  return: Fiber | null;
  hookQueue: Dispatcher<Function>[];
  memoizedState: any;
  node: VirtualElement;
};

export { Fiber, FiberTree, FiberTrees };
