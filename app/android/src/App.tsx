import Luma from "luma-js";
import styles from "./App.module.scss";

function App() {
  return <div class={{ [styles.hello]: true }}>Hi :3</div>;
}

// @ts-expect-error Argument of type 'Element' is not assignable to parameter of type 'VNode'.
Luma.render(<App />, document.querySelector(".app-root")!);
