import { useState } from "luma-js";
import { className } from "src/utils/classname";
import styles from "./Counter.module.scss";

/*
 * Demonstrate simple state management with LumaJS.
 *
 */
function Counter() {
  const onDecrement = () => {
    if (counter === 0) return;
    return counter - 1;
  };

  const [counter, setCounter] = useState(0);

  return (
    <div class={className(styles.container)}>
      <div class={className(styles.row)}>
        <button
          class={className(styles.primaryButton)}
          on={{ click: () => setCounter(counter + 1) }}
        >
          Increment
        </button>
        <button
          class={className(styles.btn)}
          on={{ click: () => setCounter(onDecrement) }}
        >
          Decrement
        </button>
      </div>
      <br />
      <div class={className(styles.counterText)}>Counter: {counter}</div>
      {counter >= 5 ? (
        <p>You incremented the counter by 5 or more, have a 🍪!</p>
      ) : (
        <p>Increment the counter 5 times!</p>
      )}
    </div>
  );
}

export default Counter;
