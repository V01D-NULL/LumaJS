import {
  init,
  classModule,
  propsModule,
  styleModule,
  attributesModule,
  eventListenersModule,
} from "snabbdom";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  attributesModule,
  eventListenersModule,
]);

export { patch };
