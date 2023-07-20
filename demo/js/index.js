import { Framework } from '../../src/index.js'
const { useState } = Framework;

const MyComponent = () => {
    const [show, setShow] = useState(false);
    const [counter, setCounter] = useState(0);

    return (
        <div>
            <button onClick={() => setShow(true)}>Change state</button>
            {show && <p>I'm showing now!</p>}
            <br />
            <br />
            <button onClick={() => setCounter(counter + 1)}>Increment</button>
            Counter: {counter}
        </div>
    )
}

function Foo() {
    const [_, setState] = useState('nay');
    return <div className='__foo__'>
        <p onClick={() => setState('yan')}>
            a
        </p>
    </div>
}

function App() {    // App
    const [_, setState] = useState(0);

    return (
        <div className='__app__'>
            {/* <button onClick={() => setState(1)}>App</button>
            <p>p tag</p> */}
            <Foo />
        </div>
    )
}


// console.log(<App />);

Framework.render(<App />, document.querySelector("#app-root"));