import Cache from "../cache/cache";

const createInstanceOfClass = ($class: any) => new ($class as any)();

/**
 *
 * @param $class A class inheriting from Component
 * @returns An instance of the class. It's either newly allocated or read from the cache
 */
const getComponent = ($class: any) => {
  const lookupKey = $class.prototype.constructor.name;
  const exists = Cache.lookup(lookupKey);

  if (exists) return exists;

  const instance = createInstanceOfClass($class);
  Cache.add(lookupKey, instance);
  return instance;
};

export default getComponent;
