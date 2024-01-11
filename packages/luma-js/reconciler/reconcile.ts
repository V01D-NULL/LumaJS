import { LumaCurrentComponent } from "../shared/component/current";
import { LumaCurrentRootComponent } from "../shared/component/root";
import {
  init,
  classModule,
  propsModule,
  styleModule,
  attributesModule,
  eventListenersModule,
} from "snabbdom";

const reconcile = init([
  classModule,
  propsModule,
  styleModule,
  attributesModule,
  eventListenersModule,
]);

function dispatch(component: NonNullable<typeof LumaCurrentComponent.current>) {
  LumaCurrentComponent.new(component);
  const reconciledComponent =
    LumaCurrentRootComponent.current.data?.luma.reconcileComponent();
  LumaCurrentComponent.delete();
  LumaCurrentRootComponent.current = reconcile(
    LumaCurrentRootComponent.current,
    reconciledComponent!
  );
}

export { reconcile, dispatch };
