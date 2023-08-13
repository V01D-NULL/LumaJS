import { LinkedList, LinkedListItem } from "../../lib/linked-list";
import { Queue } from "../../lib/queue";
import { BabelSource, Source } from "../dev/source";
import { FiberFlags } from "./fiber-flags";

type Dispatcher<A> = (...args: any[]) => A | void;

type FiberTrees = {
  Active: Fiber | null;
  WorkInProgress: Fiber | null;
};

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
  children: Array<Fiber | string | number> | null;
  firstEffect?: LinkedList<Effect>;
  hookQueue: Queue<Dispatcher<Function>>;
  hooks: any[];
  memoizedState: any[];
  attributes: HTMLElement | null;
  _source: Source;
};

type BabelProp = HTMLElement & (BabelSource | undefined);

export type { Fiber, FiberTrees, BabelProp };
