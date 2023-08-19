import { createFiber } from "./create-fibers";
import { Fiber } from "./fiber-type";
import { setWorkInProgressFiber } from "./fibers";

function buildFiberTree(generator: Generator) {
  let result = generator.next();
  let lastValue;

  while (!result.done) {
    lastValue = result.value;
    result = generator.next();
  }

  console.log(lastValue);

  // If the generator has finished but there's a last yielded value, return it
  return lastValue;
}

function* __build(element: Fiber | string | number) {
  if (typeof element === "string" || typeof element === "number") {
    return yield element;
  }

  if (typeof element.type === "function") {
    setWorkInProgressFiber(element);
    return yield* __build(element.type(element.attributes));
  }

  for (let child of element.children) {
    if (Array.isArray(child)) {
      for (let subChild of child) {
        yield* __build(subChild);
      }
    } else {
      yield* __build(child);
    }
  }

  yield element;
}

export { buildFiberTree, __build };
