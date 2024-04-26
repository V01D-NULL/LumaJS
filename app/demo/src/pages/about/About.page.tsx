import LumaJS from "luma-js";
const { ssrRender } = LumaJS;

export default function About() {
  return <div class={{ app: true }}>about page :)</div>;
}

export function ssrComponent() {
  return ssrRender(<About />);
}
