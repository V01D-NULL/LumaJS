import { useMount } from "luma-js";

/*
 * Demonstrates data passed from server to client as a component prop.
 *
 */
function ServerProps({ props }: { props: unknown }) {
  useMount(() => console.log("Props passed by the server:", props));
  return (
    <div>
      <div>Props passed from server: {JSON.stringify(props)}</div>
    </div>
  );
}

export default ServerProps;
