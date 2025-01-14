interface Window {
  __LUMA_FRAMEWORK__: {
    default: { __LUMA_INTERNAL__: { hydrateRoot: Function }; jsx: Function };
  };
  __LUMA_ROOT__: { default: Function };
  __LUMA_SSR_PROPS__: { props: Record<string, any> };
}

document.addEventListener("DOMContentLoaded", () => {
  const Framework = window.__LUMA_FRAMEWORK__.default;
  const {
    jsx,
    __LUMA_INTERNAL__: { hydrateRoot },
  } = Framework;

  const props = window.__LUMA_SSR_PROPS__;
  const componentRoot = window.__LUMA_ROOT__.default;

  hydrateRoot(
    document.querySelector(".LumaAppRoot"),
    jsx(componentRoot, props, null)
  );
});
