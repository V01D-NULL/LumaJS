import Counter from "src/components/Counter";

export default function About() {
  return (
    <div>
      about page :)
      <br />
      <Counter />
    </div>
  );
}

export async function getServerProps() {
  return {
    props: {},
  };
}
