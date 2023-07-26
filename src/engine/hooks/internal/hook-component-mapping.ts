import { Fiber } from "../../fibers/fiber-type";

// Map hooks to Fibers
type Hook = Function;
type HookOwner = { queuePosition: number; owner: Fiber };

const hookMap = new Map<Hook, HookOwner>();

function mapHookToOwner(hook: Hook, owner: HookOwner): void {
  hookMap.set(hook, owner);
}

// Get fiber of this hook
function getHookOwner(hook: Hook): HookOwner | null {
  return hookMap.get(hook);
}

export { mapHookToOwner, getHookOwner };
