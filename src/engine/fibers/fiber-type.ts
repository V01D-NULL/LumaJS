import { LinkedList, LinkedListItem } from "../../lib/linked-list";
import { Queue } from "../../lib/queue";
import { FiberFlags } from "./fiber-flags";

type Dispatcher<A> = (...args: any[]) => A | void;

interface FiberTrees {
  Active: Fiber | null;
  WorkInProgress: Fiber | null;
  RecentlyUsed: Fiber | null;
}

enum EffectTag {
  UPDATE = 1 << 0,
}

type Effect = {
  effectTag: EffectTag;
  type: string;
  domNode: HTMLElement;
  memoizedProps: Queue<unknown>;
  memoizedState: Queue<unknown>;
};

type Fiber = {
  type: string | Function | null;
  flags: FiberFlags;
  children: Fiber[] | null;
  firstEffect?: LinkedList<Effect>;
  hookQueue: Queue<Dispatcher<Function>>;
  memoizedState: any[];
  attributes: HTMLElement | null;
};

export { Fiber, FiberTrees };
