/**
 * @abstract Key value pair for the localstorage wrapper to manage
 */
type FrameworkStorageKVP = { key: string; value: any }; // Key value pair

/**
 * @abstract Wrapper around window.localStorage for persistant data
 */
class FrameworkStorage {
  private static s_storage: FrameworkStorageKVP | null = null;

  public static store(kvp: FrameworkStorageKVP): void {
    if (this.s_storage !== null) return;

    this.s_storage = kvp;
    const { key, value } = kvp;
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public static get get(): any {
    if (this.s_storage === null) return null;

    const { key } = this.s_storage as FrameworkStorageKVP;
    return JSON.parse(window.localStorage.getItem(key)!);
  }
}

export { FrameworkStorage, FrameworkStorageKVP };
