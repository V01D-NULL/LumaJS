import LumaJS from "luma-js";
const { useMount, useState } = LumaJS;

function Counter() {
  const onDecrement = () => {
    if (counter === 0) return;
    return counter - 1;
  };

  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button on={{ click: () => setCounter(counter + 1) }}>Increment</button>
      <button on={{ click: () => setCounter(onDecrement) }}>Decrement</button>
      <br />
      Counter: {counter}
    </div>
  );
}

function App() {
  console.log(LumaJS, useMount);

  useMount(() => console.log("Mounted App component"));
  const [toggle, setToggle] = useState(false);

  const greetings = ["yo", "hey", "hello"];
  const [greetingIdx, setGreetingIdx] = useState(0);

  return (
    <div style={{ background: "red" }}>
      <h1 style={{ background: "yellow" }}>Hidable Counter Demo </h1>
      <button on={{ click: () => setToggle(() => !toggle) }}>
        Toggle Counter
      </button>
      <br />
      <br />
      {toggle ? <Counter /> : "Counter OFF"}
      <br />
      <br />
      <h1>Greeting Demo</h1>
      <button
        on={{
          click: () => setGreetingIdx((greetingIdx + 1) % greetings.length),
        }}
      >
        Change greeting
      </button>
      Greeting is: {greetings[greetingIdx]}
    </div>
  );
}

LumaJS.render(<App />, document.getElementById("root"));
