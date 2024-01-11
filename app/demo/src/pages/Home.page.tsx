import LumaJS from "luma-js";
const { preRender } = LumaJS;

function Home() {
  return (
    <div>
      Hello, world :D
      <p style={{ background: "red" }}>Red!</p>
    </div>
  );
}

export function ssrComponent() {
  return preRender(<Home />);
}
