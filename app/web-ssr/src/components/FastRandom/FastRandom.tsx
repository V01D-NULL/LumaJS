import { useMount, useState } from "luma-js";
import { className } from "src/utils/classname";
import styles from "./FastRandom.module.scss";
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
    <div class={className(styles.card)}>
      <div class={className(styles.body)}>Fast Random</div>
      <div class={className(styles.title)}>
        <code>Math.random()</code> every 1ms:
        <br />
        {random}
      </div>
    </div>
  );
}

export default FastRandom;
