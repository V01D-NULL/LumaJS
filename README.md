<h1 align="center">LumaJS</h1>

<p align="center">
LumaJS is a React inspired framework created for learning purposes. It implements/mimics some of the features and APIs of React but is not intended for production use.
</p>

<p align="center">
  <img width="450" alt="luma" src="https://github.com/V01D-NULL/LumaJS/assets/58613685/2e6554ac-ec70-435d-97ee-30a46ff2e82b">
<p/>

### Getting Started

The recommended way to start a new LumaJS project is using create-luma-app:

```sh
# This will generate a new LumaJS app in the current working directory.
npx create-lumajs-app
```

You can also install LumaJS locally and import it:

```sh
npm install luma-js
```

LumaJS has a similar API to React. To use it in your project:

```ts
import LumaJS from "../../../package/build/html";

function App() {
  return (
    <div>
      <p>hi!</p>
      <button>click me</button>
    </div>
  );
}

LumaJS.render(<App />, document.getElementById("root"));
```

### Building

Framework:

```sh
cd package
yarn install
yarn build # or yarn watch to run tsc in watch mode
```

Demo app:

```sh
cd app/demo
npm i
npm start
```

### Design

LumaJS is built to be very modular, and I have plans to support different target platforms by simply changing the render method.

As of now there is only the browser as a platform, but I soon hope to add mobile (android,iOS) and make it so that LumaJS will only be bundled with the target platform (right now it builds everything)
