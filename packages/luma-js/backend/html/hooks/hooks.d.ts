declare function useState<T>(initialState: T): [T, Function];
declare function useEffect<T>(callback: () => T, deps: any[]): void;
declare function useId(): string;
declare function useRef<T>(initialValue: T): {
    current: T;
};
declare function createContext<T>(defaultValue: T): {
    value: T;
    Provider: ({ children, value, }: {
        children: JSX.Element;
        value: T;
    }) => JSX.Element;
    Consumer: ({ children, }: {
        children: (value: T) => JSX.Element;
    }) => JSX.Element;
};
declare function useContext<T>(context: {
    value: T;
}): T;
export { useState, useEffect, useId, useRef, createContext, useContext };
