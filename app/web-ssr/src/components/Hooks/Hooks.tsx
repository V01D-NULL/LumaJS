import { useState, useEffect, useId, useMount, useRef } from "luma-js";
import { className } from "src/utils/classname";
import styles from "./Hooks.module.scss";

export default function Hooks() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");
  const id = useId();
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log("Count changed to", count);
    setName("John-" + count);
  }, [count]);

  useEffect(() => {
    console.log("Name changed to", name);
  }, [name]);

  useMount(() => {
    console.log("Hooks component mounted");
  });

  useEffect(() => {
    if (ref.current) {
      console.log("ref was changed to", ref.current);
    }
  }, [ref.current]);

  return (
    <div class={className(styles.container)}>
      <h1 class={className(styles.h1Large)}>All hooks implemented in luma:</h1>
      <br />
      <h1 class={className(styles.h1Medium)}>useState:</h1>
      <p class={className(styles.textSm)}>
        Click 'Increment' to add one to the counter
      </p>
      <h3 class={className(styles.textLg)}>{count}</h3>
      <button
        class={className(styles.button)}
        on={{ click: () => setCount(count + 1) }}
      >
        Increment
      </button>
      <br />
      <br />
      <h1 class={className(styles.h1Medium)}>useEffect:</h1>
      <p class={className(styles.textSm)}>
        Appends the above count to "John" by listening for state changes of
        'count'
      </p>
      <h3 class={className(styles.textLg)}>{name}</h3>
      <br />
      <br />
      <h1 class={className(styles.h1Medium)}>useId:</h1>
      <p class={className(styles.textSm)}>
        Generate a persisted uuid across renders
      </p>
      <h3 class={className(styles.textLg)}>{id}</h3>
      <br />
      <br />
      <h1 class={className(styles.h1Medium)}>useRef:</h1>
      <p class={className(styles.textSm)}>
        Create a ref that persists across renders. This is useful for storing
        values that do not trigger a re-render when changed.
      </p>
      Use ref to focus() on input field:
      <br />
      <input
        props={{
          placeholder: "Placeholder text",
          ref: ref,
        }}
      />
      <button on={{ click: () => ref.current?.focus() }}>Focus on input</button>
    </div>
  );
}
