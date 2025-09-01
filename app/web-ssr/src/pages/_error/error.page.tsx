import type { GetServerPropsParams } from "luma-js";
import { className } from "src/utils/classname";
import styles from "./error-pages.module.scss";

type GenericErrorPageProps = {
  props: {
    errMessage: string;
  };
};

function GenericErrorPage({ props }: Readonly<GenericErrorPageProps>) {
  return (
    <div class={className(styles.container)}>
      <h1 class={className(styles.errorTitle)}>Error occured</h1>
      <p class={className(styles.errorMessage)}>{props.errMessage}</p>
      <a class={className(styles.homeLink)} attrs={{ href: "/" }}>
        Go Back Home
      </a>
    </div>
  );
}

export function getServerProps(props: GetServerPropsParams) {
  const errMessage = props.searchParams.get("errorMessage");
  return {
    props: {
      errMessage,
    },
  };
}

export default GenericErrorPage;
