import { Framework } from "../../src/index.js";
const { useState } = Framework;

function Foo() {
  const [fooState, setFooState] = useState("nay");
  return (
    <div className="__foo__">
      <button onClick={() => setFooState("yan")}>
        Nested use state hook in Foo component
      </button>
    </div>
  );
}

function App() {
  // Two or more useState hooks can be distinguished on a single component
  const [counter, setCounter] = useState(0);
  const [bool, setBool] = useState(false);

  return (
    <div>
      <button onClick={() => setBool(true)}>Set boolean to true</button>
      <br />
      <button onClick={() => setCounter(counter + 1)}>Counter++</button>
      <br />
      {counter}
      <Foo />
    </div>
  );
}

Framework.render(<App />, document.querySelector("#app-root"));
