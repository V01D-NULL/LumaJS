import { makeRpcCall } from "src/utils/rpc";

/*
 *  Invokes a function on the server on a client button press via RPC
 */
function Rpc() {
  return (
    <button
      on={{
        click: () =>
          makeRpcCall("example-rpc", { message: "Hello, RPC-World!" }).then(
            console.log
          ),
      }}
    >
      Perform an RPC call
    </button>
  );
}

export default Rpc;
