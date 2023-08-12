let currentHookIdx = 0;

function advanceToNextHook() {
  currentHookIdx++;
}

function resetHookIdx() {
  currentHookIdx = 0;
}

function getCurrentHookIdx() {
  return currentHookIdx;
}

export { advanceToNextHook, getCurrentHookIdx, resetHookIdx };
