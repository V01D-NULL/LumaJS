import LumaJS from "luma-js";
const { useMount } = LumaJS;

function Foo() {
  useMount(() => console.log("Mounted Foo component"));
  const [counter, setCounter] = LumaJS.useState(1);

  return (
    <div>
      <button on={{ click: () => setCounter(counter + 1) }}>Increment</button>
      <br />
      <span>Counter: {counter}</span>
    </div>
  );
}

export default Foo;
