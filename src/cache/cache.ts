class cache {
  private cache: Map<string, any>;

  constructor() {
    this.cache = new Map();
  }

  public add(key: string, value: any): void {
    this.cache.set(key, value);
  }

  public remove(key: string): void {
    this.cache.delete(key);
  }

  public lookup(key: string): any {
    return this.cache.get(key);
  }
}

const Cache = new cache();
export default Cache;
