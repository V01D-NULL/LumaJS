import { className } from "src/utils/classname";
import FastRandom from "src/components/FastRandom";
import Counter from "src/components/Counter";
import ServerProps from "src/components/ServerProps";
import Hooks from "src/components/Hooks";
import type { GetServerPropsParams } from "luma-js";
import styles from "./App.module.scss";
import VanillaExtract from "src/components/VanillaExtract";

type HomeProps = {
  props: {
    hello: string;
  };
};

/*
 *
 * Simple page component. This is rendered on the server and client and may therefore not contain any hooks or client specific logic.
 * Data fetching should be done in getServerProps and passed as props as demonstrated in this file.
 *
 */
export default function App(props: Readonly<HomeProps>) {
  return (
    <div class={className(styles.container)}>
      <h1 class={className(styles.title)}>Hello, world :D</h1>
      <p class={className(styles.redBanner)}>Red banner!</p>
      <a class={className(styles.link)} attrs={{ href: "/about" }}>
        About
      </a>
      <a class={className(styles.linkHeavy)} attrs={{ href: "/foo" }}>
        This is 404!
      </a>
      <a class={className(styles.linkHeavy)} attrs={{ href: "/error-example" }}>
        This page will throw, and luma-router will redirect to the
        error.page.tsx component.
      </a>
      <FastRandom />
      <br />
      <Counter />
      <br />
      <ServerProps props={props} />
      <br />
      <Hooks />
      <br />
      <br />
      In addition to scss modules, you can also style components with vanilla
      extract:
      <br />
      <VanillaExtract />
    </div>
  );
}

/*
 *
 * Run logic on the server and pass the result as props to the page component.
 * Any functions invoked within getServerProps will only run on the server and are not included in the client bundle.
 *
 */
export async function getServerProps(
  args: GetServerPropsParams
): Promise<HomeProps> {
  console.log("getServerProps", args.searchParams.get("foo"), args.uri);

  return {
    props: {
      hello: "world",
    },
  };
}
