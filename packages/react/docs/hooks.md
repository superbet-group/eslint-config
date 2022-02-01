---
title: Hooks Rules
description: Conventions for React hooks
tags:
  - tooling
  - errors
  - programming
  - code
  - guidelines
  - react
  - hooks
---

# Hooks Rules

React hooks are the preferred way to handle state and logic in React components. They are a new way to write components that is cleaner, more concise, and potentially more performant than class components. Hooks can help encapsulate and share logic between multiple components.

Hooks are a good replacement to higher order components and higher order functions, both of which should be avoided in favour of custom hooks.

## "Rules of Hooks"

1. Hook names should always be prefixed with `use`.
2. Only call hooks in React Components - otherwise they won't work and will throw an error.
3. The hook signature of a component has to be static - never call hooks conditionally or within loops. Hooks are tracked internally via reference counting, so breaking this rule breaks your components.

A couple of examples of breaking rule 3:

```js
// useLayoutEffect safely during SSR
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
```

```js
if (process.env.NODE_ENV !== "production") {
  // useMemo safely during SSR
  useDebugValue("This only appears in non-production builds");
}
```

Both of these examples won't actually cause the runtime to crash.

### ESLint Rule

```json
{ "react-hooks/rules-of-hooks": "error" }
```

## Exhaustive Deps

Some hooks have a second argument that is an array of dependencies. It is recommended to always put every variable you use inside the hook's callback body inside the `deps` array. This ensures that each value used inside the hook is up to date and aren't stale due to the closure capturing the old values.

### ESLint Rule

```json
{ "react-hooks/exhaustive-deps": "error" }
```

## `useState`

Used to manage a single piece of state value and provide a setter for that value.

- [`useState` official docs](https://reactjs.org/docs/hooks-reference.html#usestate)

## `useCallback`

Takes a function as an argument and returns a reference to that function. The reference stays the same between renders unless a member of the dependency array changes.

- [`useCallback` official docs](https://reactjs.org/docs/hooks-reference.html#usecallback)

## `useEffect`

Takes a function as an argument that can optionally return another function. The function runs **after a component updated**, but only if a member of the dependency array changes. The returned function will be called when the component is unmounted or when the dependency array changes.

- [`useEffect` official docs](https://reactjs.org/docs/hooks-reference.html#useeffect)

## `useLayoutEffect`

Similar to `useEffect`, however it runs synchronously after all DOM mutations. Updates inside of `useLayoutEffect` will be flushed before the browser paints.

- [`useLayoutEffect` official docs](https://reactjs.org/docs/hooks-reference.html#uselayouteffect)

## `useContext`

A way to access the `value` passed down via a `Context.Provider`.

- [`useContext` official docs](https://reactjs.org/docs/hooks-reference.html#usecontext)

## `useReducer`

Probably the most versatile hook. It takes a `reducer` function and an initial state as arguments and returns the current state and a `dispatch` function. To update the state, you can dispatch any value - it doesn't have to be an object, as it is customary with Redux.

You can implement a handful of other hooks with `useReducer`:

```js
const useState = (initialiser) => {
  const initialState =
    typeof initialiser === "function" ? initialiser() : initialiser;
  return useReducer((_, value) => value, initialState);
};
```

Here's `useRef`:

```js
const useRef = (current) => {
  return useReducer(() => {}, { current });
};
```

- [`useReducer` official docs](https://reactjs.org/docs/hooks-reference.html#usereducer)

## `useMemo`

Takes a function as an argument and returns a reference to the return value of that function. Upon changing a member of the dependency array, the function will be called again and the reference updated.

- [`useMemo` official docs](https://reactjs.org/docs/hooks-reference.html#usememo)

### Caveats

It can be tempting to "memo everything". The important factor to consider when deciding to memoize a value is whether it falls into one of the following categories:

1. Value is expensive to compute.
2. Value is a reference that - when changed - will cause unnecessary re-renders.

Examples of these are:

```js

```

Examples of non-appropriate use cases:

```js
// this function is not expensive enough to warrant memo
const factorialise = (number) => {
  if ([0, 1].includes(number)) {
    return 1;
  }
  let result = number;
  for (let i = result - 1; i > 0; i--) {
    result *= i;
  }
  return number;
};

const Factorial = ({ of: number = 0 }) => {
  const factorial = useMemo(() => factorialise(number), [number]);
  return <data value={factorial}>{factorial}</data>;
};
```

If you find it's causing issues with your app's performance, you can implement caching logic inside of the function instead.

```js
const cache = { 0: 1, 1: 1 };

const factorialise = (number) => {
  if (cache[number]) {
    return cache[number];
  }
  let result = number;
  for (let i = result - 1; i > 0; i--) {
    result *= i;
  }
  return result;
};
```

This enables you to take advantage of this optimisation outside of React renders and it saves an extra function call.

Another common example of premature optimisation is to wrap all object declarations in `useMemo`. In some cases it might make sense to do so, e.g.: when used in conjunction with `memo()` to stop unnecessary renders. In the rest of the cases, this is completely unnecessary. Constructing an object is inexpensive in JavaScript, so wrapping object creation in `useMemo` is most likely just adding additional overhead, as the function has to be called and the cache has to be updated with the object which prevents the engine from discarding that object.

## `useRef`

Takes an initial value as an argument and returns a reference that won't change throughout the lifecycle of the component. You can access and modify `ref.current` to keep track of values without causing new renders.

- [`useRef` official docs](https://reactjs.org/docs/hooks-reference.html#useref)

### Caveats

One might expect a reference to work the same way as any other value and so it's often passed to dependency arrays.

```jsx
const useOnMouseMove = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mousemove", callback);
      return () => {
        ref.current.removeEventListener("mousemove", callback);
      };
    }
  }, [ref]);

  return ref;
};

const Example = () => {
  const ref = useOnMouseMove(() => {
    // do something
  });

  return <div ref={ref}>...</div>;
};
```

The above example wouldn't work as you'd expect because `ref`'s value never changes so when the DOM element reference changes it will not trigger the effect and therefore the `eventListener` won't be added.

## `useImperativeHandle`

There aren't many use cases for this hook, but it's useful for implementing custom components that want to mimic built in DOM behaviour, e.g.: a custom video element.

It essentially merges a reference with an object that you pass to it, allowing you to extend that reference with custom methods.

```jsx
const Video = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    play() {
      /* custom playback logic */
    },
    pause() {
      /* custom pause logic */
    },
  }));

  return <video {...props} />;
});
```

- [`useImperativeHandle` official docs](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)

## `useDebugValue`

You can use this hook to add values to the devtools. We don't recommend using this hook in custom hooks within project codebases and reserving use of this hook for debugging purposes in shared libraries, where another debugging alternative may not be as accessible.

- [`useDebugValue` official docs](https://reactjs.org/docs/hooks-reference.html#usedebugvalue)

## Custom Hooks

The best way to share common logic between components is using and composing custom hooks. Any function that uses hooks inside of its body is considered a custom hook. You can still only call custom hooks from inside of a function component.

We prefix custom hooks with `use` and then camelCase the name of the hook. For example, `useFetch` might be a custom hook that takes a URL and returns a promise.

To not confuse others, it is important to not prefix functions with `use` unless they actually call other hooks. A custom hook should at some point call a built-in hook.

### Examples

Here's an example of a custom hook:

#### `useToggle`

```ts
const useToggle = (initial: boolean) => {
  return useReducer((state) => !state, initial);
};
```

Usage:

```tsx
const Example = () => {
  const [isToggled, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <p>{isToggled ? "Toggled" : "Not toggled"}</p>
    </div>
  );
};
```
