import LumaJS from "luma-js";

import Foo from "../components/Foo";

export default function Home() {
  return (
    <div class={{ app: true }}>
      Hello, world :D
      <p style={{ background: "red" }}>Red!</p>
      <a attrs={{ href: "/about" }}>About</a>
      <br />
      <a attrs={{ href: "/foo" }}>This is 404!</a>
      <Foo />
    </div>
  );
}
