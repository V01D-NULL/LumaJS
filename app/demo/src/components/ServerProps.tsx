import { useMount } from "luma-js";

/*
 * Demonstrates data passed from server to client as a component prop.
 *
 */
function ServerProps({ props }: { props: any }) {
  useMount(() => console.log("Props passed by the server:", props));
  return <div>Props passed from server: {JSON.stringify(props)}</div>;
}

export default ServerProps;
