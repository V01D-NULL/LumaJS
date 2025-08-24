import { className } from "src/utils/classname";
import styles from "./error-pages.module.scss";

function NotFoundPage() {
  return (
    <div class={className(styles.container)}>
      <h1 class={className(styles.errorTitle)}>404</h1>
      <p class={className(styles.errorMessage)}>
        Oops! The page you are looking for does not exist.
      </p>
      <a
        class={className(`${styles.homeLink} ${styles.homeLinkHover}`)}
        attrs={{ href: "/" }}
      >
        Go Back Home
      </a>
    </div>
  );
}

export default NotFoundPage;
