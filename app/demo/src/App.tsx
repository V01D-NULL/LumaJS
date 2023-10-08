import LumaJS from "../../../package/build/html";

function NestedFC() {
  return (
    <div>
      Despite this component being nested, the hooks will be scoped to their
      respective components!
    </div>
  );
}

function App() {
  LumaJS.useMount(() => console.log("Mounted App component"));

  return <NestedFC />;
}

LumaJS.render(<App />, document.getElementById("root"));
