document.addEventListener("DOMContentLoaded", () => {
  console.log(
    window.__LUMA_FRAMEWORK__.default.__LUMA_INTERNAL__.hydrateRoot(
      document.querySelector(".LumaAppRoot")!,
      window.__LUMA_FRAMEWORK__.default.jsx(
        window.__LUMA_ROOT__.default,
        {},
        null
      )
    )
  );
});
