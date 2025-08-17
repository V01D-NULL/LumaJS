import { createContext } from "luma-js";

const ExampleContext = createContext<string | null>(null);

export default ExampleContext;
