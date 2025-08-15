import { className } from "src/utils/classname";
import FastRandom from "../components/FastRandom";
import Counter from "src/components/Counter";
import ServerProps from "src/components/ServerProps";
import type { GetServerPropsParams } from "luma-js";
import { Hooks } from "src/components/Hooks";

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
export default function Home(props: Readonly<HomeProps>) {
  return (
    <div class={className("p-4 flex flex-col items-center")}>
      <h1 class={className("text-4xl font-bold mb-4")}>Hello, world :D</h1>
      <p
        class={className(
          "text-center bg-red-500 text-white p-4 rounded mb-4 w-full"
        )}
      >
        Red banner!
      </p>
      <a
        class={className("text-blue-500 underline mb-2")}
        attrs={{ href: "/about" }}
      >
        About
      </a>
      <a
        class={className("text-blue-500 underline mb-4")}
        attrs={{ href: "/foo" }}
      >
        This is 404!
      </a>
      <FastRandom />
      <br />
      <Counter />
      <br />
      <ServerProps props={props} />
      <br />
      <Hooks />
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
