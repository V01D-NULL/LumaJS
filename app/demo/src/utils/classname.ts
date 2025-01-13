export function className(classes: string): Record<string, boolean> {
  const split = classes.split(" ");

  return split.reduce((prev: Record<string, boolean>, curr: string) => {
    return { ...prev, [curr]: true };
  }, {});
}
