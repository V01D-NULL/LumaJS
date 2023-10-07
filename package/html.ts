import render from "backend/html/render";
import { LumaJS } from "shared/luma";
import Hooks from "backend/html/hooks";

export default {
  ...LumaJS,
  ...Hooks,
  render,
};
