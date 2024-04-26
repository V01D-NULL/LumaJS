import LumaJS from "luma-js";
const { useMount } = LumaJS;

function Foo() {
  useMount(() => console.log("Mounted Foo component"));
  const [counter, setCounter] = LumaJS.useState(0);
  setTimeout(() => {
    setCounter(Math.random());
  }, 1);

  return <div>Look ma, no hands! {counter}</div>;
}

export default Foo;
