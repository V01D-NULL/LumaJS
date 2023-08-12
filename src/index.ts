import { createElement } from "./dom/create-element";
import { render } from "./dom/render";
import { useState } from "./engine/index";

const luma = {
  createElement,
  render,
  useState,
};

export const LumaJS = new Proxy(luma, {});
