function ExampleErrorPage() {
  return <div />;
}

export function getServerProps() {
  throw new Error("This is an example error message");
}

export default ExampleErrorPage;
