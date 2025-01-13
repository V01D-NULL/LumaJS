// @ts-ignore
import init from "snabbdom-to-html/init";
// @ts-ignore
import modules from "snabbdom-to-html/modules";

const htmlify = init([
  modules.class,
  modules.props,
  modules.attributes,
  modules.style,
]);

export { htmlify };
