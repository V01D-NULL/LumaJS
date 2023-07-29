import { createElement } from "./dom/create-element";
import { render } from "./dom/render";
import { useState } from "./engine/index";

const framework = {
  createElement,
  render,
  useState,
};

export const Framework = new Proxy(framework, {});
