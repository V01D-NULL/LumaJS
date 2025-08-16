import { useState, useEffect, useId, useMount, useRef } from "luma-js";
import { className } from "src/utils/classname";

export function Hooks() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");
  const id = useId();
  const ref = useRef("My Custom Ref");

  useEffect(() => {
    console.log("Count changed to", count);
    setName("John-" + count);
  }, [count]);

  useEffect(() => {
    console.log("Name changed to", name);
  }, [name]);

  useEffect(() => {
    console.log(ref);
  }, [ref.current]);

  useMount(() => {
    console.log("Hooks component mounted");
  });

  return (
    <div>
      <h1 class={className("text-4xl")}>All hooks implemented in luma:</h1>
      <br />
      <h1 class={className("text-2xl")}>useState:</h1>
      <p class={className("text-sm")}>
        Click 'Increment' to add one to the counter
      </p>
      <h3 class={className("text-lg")}>{count}</h3>
      <button on={{ click: () => setCount(count + 1) }}>Increment</button>
      <br />
      <br />
      <h1 class={className("text-2xl")}>useEffect:</h1>
      <p class={className("text-sm")}>
        Appends the above count to "John" by listening for state changes of
        'count'
      </p>
      <h3 class={className("text-lg")}>{name}</h3>
      <br />
      <br />
      <h1 class={className("text-2xl")}>useId:</h1>
      <p class={className("text-sm")}>
        Generate a persisted uuid across renders
      </p>
      <h3 class={className("text-lg")}>{id}</h3>
      <br />
      <br />
      <h1 class={className("text-2xl")}>useRef:</h1>
      <p class={className("text-sm")}>
        Create a ref that persists across renders. This is useful for storing
        values that do not trigger a re-render when changed. (Note: due to
        FastComponent rerendering every millisecond the ref will update
        immediately)
      </p>
      Change Ref Value:
      <br />
      <input
        class={className("border p-2 rounded")}
        attrs={{ value: ref.current }}
        on={{ input: (e) => (ref.current = e.target.value) }}
      />
    </div>
  );
}
