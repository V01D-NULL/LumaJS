import { className } from "src/utils/classname";
import FastRandom from "../components/FastRandom";
import Counter from "src/components/Counter";
import ServerProps from "src/components/ServerProps";

type HomeProps = {
  props: {
    hello: string;
  };
};

export default function Home(props: HomeProps) {
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
    </div>
  );
}

export async function getServerProps(): Promise<HomeProps> {
  console.log("getServerProps");

  return {
    props: {
      hello: "world",
    },
  };
}
