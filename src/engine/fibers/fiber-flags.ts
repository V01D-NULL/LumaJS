import { Fiber } from "./fiber-type";

enum FiberFlags {
  NONE = 1 << 0,
  DIRTY = 1 << 1,
}

function markFiberFlags(fiber: Fiber, mark: FiberFlags) {
  fiber.flags |= mark;
}

function unmarkFiberFlags(fiber: Fiber, mark: FiberFlags) {
  fiber.flags &= ~mark;
}

export { markFiberFlags, unmarkFiberFlags, FiberFlags };
