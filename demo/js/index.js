import { Framework } from "../../src/index.js";
const { useState } = Framework;

function TextComponent() {
  const [text, _] = useState(["hi", "hello", "hey"]);
  const [textIndex, setTextIndex] = useState(0);

  const updateIndex = () => {
    if (textIndex === 2) {
      setTextIndex(0);
      return;
    }
    setTextIndex(textIndex + 1);
  };

  return (
    <div>
      <button onClick={updateIndex}>Click</button>
      {text[textIndex]}
    </div>
  );
}

// Your App component
function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Counter++</button>
      <button onClick={() => setCounter(counter - 1)}>Counter--</button>
      <p>Counter {counter}</p>
      <br />
      <TextComponent />
    </div>
  );
}

// Render the App component.
Framework.render(<App />, document.querySelector("#app-root"));
