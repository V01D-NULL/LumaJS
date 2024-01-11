import LumaJS from "luma-js";
const { preRender } = LumaJS;

function About() {
  return <div>about page :)</div>;
}

export function ssrComponent() {
  return preRender(<About />);
}
