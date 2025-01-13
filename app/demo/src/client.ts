interface Window {
  __LUMA_FRAMEWORK__: {
    default: { __LUMA_INTERNAL__: { hydrateRoot: Function }; jsx: Function };
  };
  __LUMA_ROOT__: { default: Function };
  __LUMA_SSR_PROPS__: { props: Record<string, any> };
}

document.addEventListener("DOMContentLoaded", () => {
  console.log(
    window.__LUMA_FRAMEWORK__.default.__LUMA_INTERNAL__.hydrateRoot(
      document.querySelector(".LumaAppRoot")!,
      window.__LUMA_FRAMEWORK__.default.jsx(
        window.__LUMA_ROOT__.default,
        { props: window.__LUMA_SSR_PROPS__.props },
        null
      )
    )
  );
});
