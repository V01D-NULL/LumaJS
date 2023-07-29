const DEV = process.env.NODE_ENV === "development";

export function CheckDev(callback: Function) {
  if (DEV) return callback;
}
