import Framework, { FrameworkDOM } from '../../src/index.js'
import { deprecated, readonly } from '../../src/api/decorators/index.js'

@deprecated
class LegacyCode extends Framework.Component {
    render() {
        return <div>
            This is legacy code.
        </div>
    }
}

class NotApp extends Framework.Component {
    render() {
        return <div>
            Here are two props that have been passed to a class instead of a function.
            <br />
            <br />
            These are the props:
            "{this.props.foo}" and "{this.props.bar}"
        </div>;
    }
}

class App extends Framework.Component {
    @readonly foo = 'bar';

    constructor() {
        super();
        // this.foo = 'baz' // This will blow up. Try it!
        this.state = { breed: 'Golden Retriever' };
    }

    SpaceDoggo(props) {
        return <div>This is my custom nested component: space doggo 🐶. Props: {props.bark}</div>;
    }

    render() {
        return <div>
            <h1>Welcome to a demonstration of my custom Framework :D</h1>
            <hr />

            The @deprecated decorator will log a warning to the console when using the LegacyCode component:
            <LegacyCode />
            <br />

            Here we are rendering "SpaceDoggo", which is actually a function returning JSX!
            <this.SpaceDoggo bark={'Woof'}></this.SpaceDoggo>
            <hr />

            There is primitive support for states (it's an ongoing work in progress):
            <br />
            Space doggo is a {this.state.breed}

            <hr />
            You can render a class the inherits from Framework.Component assuming it has a valid render() function:
            <br />
            <NotApp foo={'This is a prop named \'foo\''} bar={'This is a prop named \'bar\''} />

            <hr />

            Lastly, there is support for conditional rendering.
            <br />
            Don't see it? Change the state!
            {this.state.breed === 'Doggo' && <p>This was conditionally rendered because you changed the state to 'Doggo'. How about that :D</p>}

            <br />
            <br />

            <button onClick={() => this.state.breed = 'Doggo'}>Change state to Doggo</button>
            <button onClick={() => this.state.breed = 'Lab'}>Change state to Lab</button>
        </div>;
    }
};

const root = FrameworkDOM.createRoot(document.querySelector("#app-root"));
root.render(App, document.querySelector("#app-root"));
