# LumaJS

LumaJS is a lightweight React framework clone created for learning purposes. It reimplements some of the core features and APIs of React but is not intended for production use.

### Getting Started
The recommended way to start a new LumaJS project is using npx:

```sh
# This will generate a new LumaJS app in the current working directory.
npx create-luma-app
```

You can also install LumaJS locally and import it:

```sh
npm install luma-js
```

LumaJS has a similar API to React. To use it in your project:

```js
import { render, useState } from 'lumajs';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

render(<Counter />, document.getElementById('root'));
```

### State and Hooks
State in components can be managed with the useState hook:


```js
import { useState } from 'lumajs';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
Hooks like useState allow using stateful logic in function components.

### Contributing
Feel free to contribute to LumaJS if you want to help improve or expand on the simple React clone implementation! The goal is to build out features to learn how React works underneath.

Let me know if you have any other questions! LumaJS is purely an educational project so I can explain more about the motivation and approach behind it.
