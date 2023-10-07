import LumaJS from "../../../package/build/html";

function App() {
  LumaJS.useMount(() => console.log("Mounted component!"));

  return (
    <div>
      <button class={{ bruh: true }} on={{ click: () => console.log("click") }}>
        click me
      </button>
      <br />
      <br />
      <a props={{ href: "#" }}>Goto</a>
    </div>
  );
}

LumaJS.render(<App />, document.getElementById("root"));
