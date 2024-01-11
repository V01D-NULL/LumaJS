import LumaJS from "luma-js";
const { preRender } = LumaJS;

function Home() {
  return (
    <div>
      Hello, world :D
      <p style={{ background: "red" }}>Red!</p>
      <a attrs={{ href: "/about" }}>About</a>
      <br />
      <a attrs={{ href: "/foo" }}>This is 404!</a>
    </div>
  );
}

export function ssrComponent() {
  return preRender(<Home />);
}
