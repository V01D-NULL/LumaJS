import { LumaCurrentComponent } from "shared/component/current";
import { VNode, h } from "snabbdom";

function createElement(
  type: string | ((...args: any[]) => VNode),
  config: any,
  key: any,
  source: DebugProps["source"] = null,
  self: DebugProps["self"] = null
) {
  const children = config.children;
  delete config.children; // Remove children from config so it doesn't get passed as a prop

  // NOTE: It is safe to assume the data property is not null or undefined, making the non-null assertions safe.
  if (type instanceof Function) {
    LumaCurrentComponent.new({} as any);
    const fc = type(config, children);
    let x: VNode = {} as any;

    fc.data = {
      hook: {
        ...LumaCurrentComponent.current?.domHooks,
        update: (oldNode, newNode) => {
          const data = oldNode.data!.luma;
          console.log("Patching a function component:", data.fc);
        },
      },

      /* LumaJS specific data */
      luma: {
        hooks: [],
        debug: { self, source },
        fc: type.name,
      },
    };

    LumaCurrentComponent.delete();
    return fc;
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
