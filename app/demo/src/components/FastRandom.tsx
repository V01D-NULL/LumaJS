import { useMount, useState } from "luma-js";
import { className } from "src/utils/classname";

/*
 *  Demonstrates how fast LumaJS can update the DOM.
 *
 */
function FastRandom() {
  useMount(() => console.log("Mounted FastRandom component"));

  const [random, setRandom] = useState(0);

  setTimeout(() => {
    setRandom(Math.random());
  }, 1);

  return (
    <div
      class={className(
        "p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4"
      )}
    >
      <div class={className("text-center text-xl font-medium text-black")}>
        Fast Random
      </div>
      <div class={className("text-center text-gray-500")}>
        <code>Math.random()</code> every 1ms:
        <br />
        {random}
      </div>
    </div>
  );
}

export default FastRandom;
