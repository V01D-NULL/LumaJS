import { render, createElement } from "./dom/render";
import { useState } from "./engine/index";

const framework = {
  createElement,
  render,
  useState,
};

export const Framework = new Proxy(framework, {});
