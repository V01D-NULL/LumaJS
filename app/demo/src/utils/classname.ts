import { clsx, type ClassValue } from "clsx";

export function className(...classes: ClassValue[]): Record<string, boolean> {
  const processed = clsx(classes);
  const split = processed.split(" ");

  return split.reduce((prev: Record<string, boolean>, curr: string) => {
    return { ...prev, [curr]: true };
  }, {});
}
