import { Component } from "../../dom/component";

export const deprecated = (target: any, name: any, descriptor: any) => {
  const isClass = target.prototype instanceof Component;

  if (!isClass) {
    console.warn(
      "You can only use @deprecated on classes inhereting from Component"
    );
    return descriptor;
  }

  target.prototype.deprecated = true;

  return descriptor;
};
