import { CheckDev } from "./check-dev-mode";

const logDebug = CheckDev(function (...varArgs: any[]) {
  console.log("[DEBUG]:", ...varArgs);
});

export { logDebug };
