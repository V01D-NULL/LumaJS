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

function App() {    // App
    const [_, setState] = useState(0);

    return (
        <div className="wrapper">
            <button onClick={() => setState(1)}>
                <p>Weee</p>
            </button>
            {/* <div className="list">
                <div className="list_item_A">List item A</div>
                <div className="list_item_B">List item B</div>
            </div>
            <div className="section">
                <button className="section_B">Add</button>
                <span className="section_S">No. of items: 2</span>
            </div>
    */}
            {/* <MyComponent /> */}
        </div>
    );
}


Framework.render(<App />, document.querySelector("#app-root"));