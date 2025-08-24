import { className } from "src/utils/classname";
import * as styles from "./VanillaExtract.css";

function VanillaExtract() {
  return (
    <div class={className(styles.container)}>
      This is styled with @vanilla-extract
    </div>
  );
}

export default VanillaExtract;
