import { Framework } from '../../src/index.js'

const SpaceDoggo = (
    <div>
        This is my custom nested component: space doggo 🐶
    </div>
)

// Alternatively you can use `function foo(props) {...}`
function ConditionalRendering({ sayHi, someOtherParameter }) {
    return (
        <div>
            props.sayHi indicates I should say: {sayHi ? 'Hi!' : 'Bye!'}
            <br />
            Here is the value of 'someOtherParameter': {someOtherParameter}
            <br />
            <br />
        </div>
    )
}

const MyComponent = (
    // Creating some HTML elements
    <div id="my-div">
        This is a div with an id of "my-div"
        <p class="my-class">
            This is a paragraph with a class of "my-class"
        </p>
        <p wanna-sprite-cranberry>
            This is a paragraph with a custom attribute called "wanna-sprite-cranberry"
        </p>

        {/* Rendering a custom JSX component */}
        <SpaceDoggo />

        {/* Conditional rendering via a function and some arguments */}
        <br />
        I can even use JSX for conditional rendering:
        <br />
        <ConditionalRendering sayHi={true} someOtherParameter={'Mario'} />

        <ConditionalRendering sayHi={false} someOtherParameter={'Luigi'} />

    </div>
)

// Framework.render(MyComponent, document.querySelector("#app-root"));
Framework.render(<MyComponent />, document.querySelector("#app-root"));