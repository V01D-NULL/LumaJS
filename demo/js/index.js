import Framework, { FrameworkDOM } from '../../src/index.js'

class NotApp extends Framework.Component {
    render() {
        return <div> Hello, I'm defintely not app but I am rendered inside of it. </div>
    }
}

class App extends Framework.Component {
    constructor() {
        super();
        this.state = { breed: 'Golden Retriever' };
    }

    SpaceDoggo() {
        return <div>This is my custom nested component: space doggo 🐶</div>;
    }

    render() {
        return <div>
            <p>This is a p tag inside of a div.</p>
            <hr />

            There is also support for nested components:
            <this.SpaceDoggo></this.SpaceDoggo>
            <hr />

            There is primitive support (WIP) for states:
            <br />
            Space doggo is a {this.state.breed}

            <hr />
            Last but not least you can render a class the inherits from Framework.Component and has a render function:
            <br />
            <NotApp></NotApp>
        </div>;
    }
};

const root = FrameworkDOM.createRoot(document.querySelector("#app-root"));
root.render(App, document.querySelector("#app-root"));
