import { LumaCurrentComponent } from "../shared/component/current";
import { VNode, h } from "snabbdom";
import { withRef } from "./refObj";

function createElement(
  type: string | ((...args: any[]) => VNode),
  config: any,
  key: any,
  source: DebugProps["source"] = null,
  self: DebugProps["self"] = null
) {
  const children = config.children;

  // NOTE: It is safe to assume the data property is not null or undefined, making the non-null assertions safe.
  if (type instanceof Function) {
    LumaCurrentComponent.new({} as any);
    const fc = type(config, children);

    fc.data = {
      ...fc.data,
      hook: LumaCurrentComponent.current?.domHooks,

      /* LumaJS specific data */
      luma: {
        debug: { self, source },
        component: type.name,
        reconcileComponent: () =>
          createElement(type, { ...config, children }, key, source, self),
      },
    };

    LumaCurrentComponent.current!.node = fc;
    LumaCurrentComponent.current!.name = type.name;
    LumaCurrentComponent.delete();
    return fc;
  }

  if (config.props?.ref) {
    config = {
      ...config,
      ...withRef(config.props.ref, config.props.onRefUpdate),
    };
  }

  return h(type, config, children);
}

function jsx(
  type: string | ((...args: any[]) => VNode),
  config: any,
  key: any
) {
  return createElement(type, config, key);
}

function jsxDEV(
  type: string | ((...args: any[]) => VNode),
  config: any,
  key: any,
  source: DebugProps["source"],
  self: DebugProps["self"]
) {
  return createElement(type, config, key, source, self);
}

export { jsx, jsxDEV };
