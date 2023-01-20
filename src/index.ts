/**
 *  This is the main file that will be included by the client.
 *  It's purpose is to create, initialize, store and expose the Framework
 */
import { Component } from "./dom/component";
import Dom from "./dom/dom";

const Framework = {
  Component: Component,
};

const FrameworkDOM = new Dom();

export default Framework;
export { FrameworkDOM };
