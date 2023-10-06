import LumaJS from "../../../package/build/html";

function App() {
  return (
    <div>
      <p>hi!</p>
      <button>click me</button>
    </div>
  );
}

LumaJS.render(<App />, document.getElementById("root"));
