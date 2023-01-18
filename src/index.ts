/**
 *  This is the main file that will be included by the client.
 *  It's purpose is to create, initialize, store and expose the Framework
 */
import { Renderer } from "./render/render";
import { IFramework } from "./interfaces/framework";

const { createElement, render } = new Renderer();

const framework: IFramework = {
  createElement,
  render,
};

export const Framework = new Proxy(framework, {});
