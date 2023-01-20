import Framework, { FrameworkDOM } from '../../src/index.js'

class NotApp extends Framework.Component {
    render() {
        return <div> Hello, I'm defintely not app but I am rendered inside of it.
            <div>
                Here are two props that have been passed to a class instead of a function:
                "{this.props.foo}" and "{this.props.bar}"
            </div>
        </div>;
    }
}

class App extends Framework.Component {
    constructor() {
        super();
        this.state = { breed: 'Golden Retriever' };
    }

    SpaceDoggo(props) {
        return <div>This is my custom nested component: space doggo 🐶. Props: {props.bark}</div>;
    }

    render() {
        return <div>
            <p>This is a p tag inside of a div.</p>
            <hr />

            There is also support for nested components:
            <this.SpaceDoggo bark={'Woof'}></this.SpaceDoggo>
            <hr />

            There is primitive support (WIP) for states:
            <br />
            Space doggo is a {this.state.breed}

            <hr />
            Last but not least you can render a class the inherits from Framework.Component and has a render function:
            <br />
            <NotApp foo={'This is a prop named \'foo\''} bar={'This is a prop named \'bar\''}></NotApp>

            <hr />
        </div>;
    }
};

const root = FrameworkDOM.createRoot(document.querySelector("#app-root"));
root.render(App, document.querySelector("#app-root"));
