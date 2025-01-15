<h1 align="center">LumaJS</h1>

<p align="center">
LumaJS is a React inspired framework with optional SSR capabilities via luma-router, built for learning purposes. It implements/mimics some of the features and APIs of React but is not intended for production use.
</p>

<p align="center">
<img width="749" alt="Screenshot 2025-01-15 at 02 33 52" src="https://github.com/user-attachments/assets/2b8c01b2-05fc-45f3-b160-5ac4259846f9" />

<p/>

### Getting Started

The recommended way to start a new LumaJS project is using create-luma-app:

```sh
# COMING SOON
# This will generate a new LumaJS app in the current working directory.
npx create-lumajs-app
```

LumaJS has a similar API to React or, if SSR is used, next.js.
Run the examples:

### Building

Packages:

```sh
# project root
npm install
npm run build
```

Demo app:

```sh
cd app/demo
npm install
npm run dev
```

### How it works:

At the core of this framework is `luma-js`. It is the actual javascript framework containing vital things such as hooks and reconcilation. It is powered by snabbdom.

SSR support for luma is powered by `luma-router`, a package that acts as a page router and rendering service. Server side props, initial server renders and co happen in this package.

`luma-cli` is a package to provide convenience methods for building and running luma with ssr.
