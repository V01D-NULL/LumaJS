import LumaJS from "luma-js";
import { className } from "src/utils/classname";
const { useState } = LumaJS;

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
    <div class={className("flex flex-col items-center p-4")}>
      <div class={className("flex space-x-4")}>
        <button
          class={className("bg-blue-500 text-white px-4 py-2 rounded")}
          on={{ click: () => setCounter(counter + 1) }}
        >
          Increment
        </button>
        <button
          class={className("bg-red-500 text-white px-4 py-2 rounded")}
          on={{ click: () => setCounter(onDecrement) }}
        >
          Decrement
        </button>
      </div>
      <br />
      <div class={className("text-lg font-semibold")}>Counter: {counter}</div>
      {counter >= 5 ? (
        <p>You incremented the counter by 5 or more, have a 🍪!</p>
      ) : (
        <p>Increment the counter 5 times!</p>
      )}
    </div>
  );
}

export default Counter;
