const DEV =
  typeof process !== "undefined"
    ? process.env.NODE_ENV === "development"
    : false;

export function CheckDev(callback: Function) {
  if (DEV) return callback;
  return () => {};
}
