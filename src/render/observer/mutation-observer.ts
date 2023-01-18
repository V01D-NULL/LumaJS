/**
 * @abstract Observes mutations in the rendered DOM tree
 * @class MutationObserver - Provides the ability to hook into DOM mutation events
 */
export class MutationObserver {
  public trackDom = (target: Node, options: MutationObserverInit) =>
    this.mutationObvserver.observe(target, options);

  public trackProxy = () => {
    return {
      set(object: Object, prop: string | symbol, value: any): boolean {
        console.log("Setting", prop, "on object", object, "to", value);
        return false;
      },
    };
  };

  private mutationObvserver = new window.MutationObserver((mutations: any) => {
    mutations.forEach((mutation: any) =>
      console.log("Detected a mutation in:", mutation)
    );
  });
}
