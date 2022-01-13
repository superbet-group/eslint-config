---
title: React Rules
description: Rules for writing clearer codebases around working with React
tags:
  - tooling
  - errors
  - programming
  - code
  - guidelines
  - react
  - components
---

# React Rules

## Stylistic Rules

Majority of these rules are also enforced by Prettier.

### JSX Closing Bracket

This rule checks all JSX multiline elements and verifies the location of the closing bracket. By default this one must be aligned with the opening tag.

#### Example

**Bad**

<!-- prettier-ignore -->
```jsx
<Hello
  lastName="Smith"
  firstName="John" />;

<Hello
  lastName="Smith"
  firstName="John"
  />;
```

**Good**

```jsx
const example = <Hello lastName="Smith" firstName="John" />;

const example = (
  <Hello
    slastName="Smith"
    firstName="John"
    language="en"
    occupation="engineer"
  />
);
```

#### ESLint Rule

> NOTE: This rule is also enforced by Prettier.

```json
{ "react/jsx-closing-bracket-location": ["error", "line-aligned"] }
```

### JSX Closing Tag Location

#### Example

**Bad**

<!-- prettier-ignore -->
```jsx
const hello = <Hello>
  marklar
  </Hello>
const hello = <Hello>
  marklar</Hello>
```

**Good**

```jsx
const hello = <Hello>marklar</Hello>;
const longOne = (
  <SomeVeryLongComponentName>
    With a lot of content inside of it
  </SomeVeryLongComponentName>
);
```

#### ESLint Rule

```json
{ "react/jsx-closing-tag-location": "error" }
```

### Spaces Inside Curly Braces

It is recommended not to add spaces inside curly braces.

#### Example

**Bad**

<!-- prettier-ignore -->
```jsx
const hello = <Hello name={ firstname } />;
const hello = <Hello name={ firstname} />;
const hello = <Hello name={firstname } />;
```

**Good**

```jsx
const hello = <Hello name={firstname} />;
const hello = <Hello name={{ firstname: "John", lastname: "Doe" }} />;
```

#### ESLint Rule

```json
{ "react/jsx-curly-spacing": ["error", "never", { "allowMultiline": true }] }
```

### Indenting Props

We recommend indenting props with `2` spaces, however this setting should always match your preferred indentation setting for your specific codebase, e.g.: `tabs` or `spaces`.

#### ESLint Rule

```json
{ "react/jsx-indent-props": ["error", 2] }
```

### Maximum Props Per Line

We recommend to have no more than `1` props per line when using multiline JSX prop definitions.

#### Example

**Bad**

<!-- prettier-ignore -->
```jsx
const example = <Example
  something={"something"} otherThing={"otherThing"}
  thirdThing={"thirdThing"}
/>
```

**Good**

```jsx
const example = (
  <Example
    something={"something"}
    otherThing={"otherThing"}
    thirdThing={"thirdThing"}
  />
);
```

#### ESLint Rule

```json
{
  "react/jsx-max-props-per-line": [
    "error",
    { "maximum": 1, "when": "multiline" }
  ]
}
```

### Sort Prop Types

Sorting prop types alphabetically gives more structure to a codebase and reduces merge conflicts. We recommend sorting prop types alphabetically and following this order:

1. Required props
2. Optional props
3. Callbacks

Properties within shapes should also follow the same order.

#### Example

**Bad**

```jsx
Component.propTypes = {
  onBar: PropTypes.func,
  a: PropTypes.number,
  z: PropTypes.string,
  onFoo: PropTypes.func,
  c: PropTypes.number,
};
```

**Good**

```jsx
Component.propTypes = {
  a: PropTypes.number,
  c: PropTypes.number,
  z: PropTypes.string,
  onBar: PropTypes.func,
  onFoo: PropTypes.func,
};
```

#### ESLint Rule

```json
{
  "react/sort-prop-types": [
    "error",
    {
      "ignoreCase": true,
      "callbacksLast": true,
      "requiredFirst": true,
      "sortShapeProp": true
    }
  ]
}
```

### Sort Props in JSX

Sorting alphabetically increases searchability and reduces merge conflicts. We recommend sorting props alphabetically and following this order:

1. `key` and `ref`
2. Shorthands, e.g.: `active` and `disabled` alphabetically
3. Non-callback props alphabetically
4. Callbacks alphabetically

#### Example

**Bad**

```jsx
<SpecialButton
  title="Hello"
  description="World"
  name="John"
  key={item.id}
  onClick={signup}
  disabled={isDisabled}
  primary
  active
/>
```

**Good**

```jsx
<SpecialButton
  key={item.id}
  primary
  active
  description="World"
  disabled={isDisabled}
  name="John"
  title="Hello"
  onClick={signup}
/>
```

#### ESLint Rule

```json
{
  "react/jsx-sort-props": [
    "error",
    {
      "ignoreCase": true,
      "callbacksLast": true,
      "shorthandFirst": true,
      "shorthandLast": false,
      "noSortAlphabetically": false,
      "reservedFirst": ["ref", "key"]
    }
  ]
}
```

### Parentheses in Multiline JSX

Wrapping multiline JSX in parentheses can improve readability and/or convenience.

#### Example

**Bad**

<!-- prettier-ignore -->
```jsx
const example = <Example><Hello
  lastName="Smith"
  firstName="John"
/></Example>
```

**Good**

```jsx
const example = (
  <Example>
    <Hello lastName="Smith" firstName="John" />
  </Example>
);
```

#### ESLint Rule

> NOTE: this rule is also enforced by Prettier.

```json
{
  "react/jsx-wrap-multilines": [
    "error",
    {
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "parens-new-line",
      "logical": "parens-new-line",
      "prop": "parens-new-line"
    }
  ]
}
```

### First Prop on a New Line

#### Example

> NOTE: this rule is also enforced by Prettier.

**Bad**

<!-- prettier-ignore -->
```jsx
<Hello personal={true}
  foo="bar"
  bar="bar"
  baz="bar"
  quox="bar"
/>
```

**Good**

```jsx
const example = (
  <Hello personal={true} foo="bar" bar="bar" baz="bar" quox="bar" />
);

const example = (
  <Hello
    personal={true}
    foo="bar"
    bar="bar"
    baz="bar"
    quox="bar"
    someProp="something"
    anotherProp="something"
  />
);
```

#### ESLint Rule

```json
{ "react/jsx-first-prop-new-line": ["error", "multiline-multiprop"] }
```

### Equals Spacing

We recommend not using any spaces around `=` in JSX props.

#### Example

**Bad**

<!-- prettier-ignore -->
```jsx
<Hello name = {firstname} />;
<Hello name ={firstname} />;
<Hello name= {firstname} />;
```

**Good**

```jsx
<Hello name={firstname} />;
<Hello name={firstname} />;
<Hello name={firstname} />;
```

#### ESLint Rule

> NOTE: this rule is better enforced by Prettier.

```json
{ "react/jsx-equals-spacing": ["error", "never"] }
```

### JSX Indentation

We recommend using consistent spacing in your JSX as indentation.

#### Example

**Bad**

<!-- prettier-ignore -->
```jsx
<App>
<Hello />
</App>

<App>
    <Hello />
</App>
```

**Good**

```jsx
<App>
  <Hello />
</App>
```

#### ESLint Rule

```json
{ "react/jsx-indent": ["error", 2] }
```

### Whitespace in and Around JSX Brackets

We recommend the following rules for whitespaces around JSX brackets:

1. No space before closing slash `>`
2. Space before self closing JSX tag `<Hello />`
3. No space after opening tag `<div`
4. No space before closing tag `</div>`

#### ESLint Rule

```json
{
  "react/jsx-tag-spacing": [
    "error",
    {
      "closingSlash": "never",
      "beforeSelfClosing": "always",
      "afterOpening": "never",
      "beforeClosing": "never"
    }
  ]
}
```

### One Expression Per Line

We recommend limiting JSX trees to one expression per line, with the exception of components accepting a single child (space permitting).

#### Example

**Bad**

<!-- prettier-ignore -->
```jsx
const example = <Hello><World /><You /></Hello>
```

**Good**

```jsx
const example = (
  <Hello>
    <World />
    <You />
  </Hello>
);
```

#### ESLint Rule

> NOTE: Because Prettier generates a much more readable output, this rule is switched off.

```json
{ "react/jsx-one-expression-per-line": ["off", { "allow": "single-child" }] }
```

### Consistent Destructuring

We recommend destructuring `props` `state` and `context` in components wherever applicable.

#### Example

**Bad**

```jsx
const MyComponent = (props) => {
  return <div id={props.id} />;
};

const Foo = class extends React.PureComponent {
  render() {
    return <div>{this.context.foo}</div>;
  }
};
```

**Good**

```jsx
const MyComponent = ({ id }) => {
  return <div id={id} />;
};

const MyComponent = (props, context) => {
  const { id } = props;
  return <div id={id} />;
};

class MyComponent extends React.PureComponent {
  render() {
    const { title } = this.context;
    return <div>{title}</div>;
  }
}
```

#### ESLint Rule

```json
{ "react/destructuring-assignment": ["error", "always"] }
```

### Multiple Spaces Between Props

We recommend using a single space to separate props.

#### Example

**Bad**

<!-- prettier-ignore -->
```jsx
const example  = <Component prop1={4}  prop2="hello"    prop3={null} />
```

**Good**

```jsx
const example = <Component prop1={4} prop2="hello" prop3={null} />;
```

#### ESLint Rule

```json
{ "react/jsx-props-no-multi-spaces": "error" }
```

### Linebreaks in Curly Braces

We recommend consistent use of linebreaks in JSX curly braces.

#### Example

> NOTE: this rule is better enforced by Prettier.

**Bad**

<!-- prettier-ignore -->
```jsx
const example = <div>
  { foo
  }
</div>

const example = <div>
  {
    foo }
</div>

const example = <div>
  { foo &&
    foo.bar
  }
</div>
```

**Good**

```jsx
const example = <div>{foo}</div>;

const example = <div>{foo}</div>;

const example = (
  <div>
    {foo && foo.bar && something && something.otherThing && anotherProperty}
  </div>
);
```

#### ESLint Rule

```json
{
  "react/jsx-curly-newline": [
    "error",
    {
      "multiline": "consistent",
      "singleline": "consistent"
    }
  ]
}
```

<!-- end Stylistic Rules -->

## Class Components

We recommend avoiding usage of `class` components whenever possible. A majority of the functionality currently provided by `class` components is already provided by `function` components also. A major exception is error boundaries, however, it is recommended to create a utility `class` component for error boundaries that can be re-used across functional components too, e.g.:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // log error
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const MyApp = () => {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
};
```

### Use `this`

Class methods should use `this` to ensure that a separate function is not more appropriate to define their functionality.

Built in React methods are exempt from this rule.

#### Example

**Bad**

```jsx
class MyComponent extends React.Component {
  renderSideBar() {
    return <div>Sidebar</div>;
  }
  render() {
    return (
      <div>
        {this.renderSideBar()}
        {this.props.children}
      </div>
    );
  }
}
```

**Good**

```jsx
const SideBar = () => <div>Sidebar</div>;
class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <SideBar />
        {this.props.children}
      </div>
    );
  }
}
```

#### ESLint Rule

```json
{
  "class-methods-use-this": [
    "error",
    {
      "exceptMethods": [
        "render",
        "getInitialState",
        "getDefaultProps",
        "getChildContext",
        "componentWillMount",
        "UNSAFE_componentWillMount",
        "componentDidMount",
        "componentWillReceiveProps",
        "UNSAFE_componentWillReceiveProps",
        "shouldComponentUpdate",
        "componentWillUpdate",
        "UNSAFE_componentWillUpdate",
        "componentDidUpdate",
        "componentWillUnmount",
        "componentDidCatch",
        "getSnapshotBeforeUpdate"
      ]
    }
  ]
}
```

### Typos in Class Methods

We use the below rule to prevent common typos in class methods.

It's useful for preventing casing errors.

#### ESLint Rule

```json
{ "react/no-typos": "error" }
```

### `setState` in `componentDidUpdate`

Updating the state after a component update will trigger a second `render()` call and can lead to property/layout thrashing.

#### Example

**Bad**

```jsx
class Example extends React.Component {
  state = {
    count: 0,
  };

  componentDidUpdate() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}
```

**Good**

```jsx
class Example extends React.Component {
  state = {
    count: 0,
  };

  render() {
    return <div>{this.state.count}</div>;
  }
}
```

#### ESLint Rule

```json
{ "react/no-did-update-set-state": "error" }
```

### `setState` in `componentWillUpdate`

Updating the state during the `componentWillUpdate` step can lead to indeterminate component state and is not allowed.

#### Example

**Bad**

```jsx
class Example extends React.Component {
  state = {
    count: 0,
  };

  componentWillUpdate() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}
```

#### ESLint Rule

```json
{ "react/no-will-update-set-state": "error" }
```

### Mutating `this.state`

NEVER mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat `this.state` as if it were immutable.

The only place that's acceptable to assign `this.state` is in a ES6 class component constructor.

#### Example

**Bad**

```jsx
class Example extends React.Component {
  state = {
    count: 0,
  };

  update = () => {
    this.state.count += 1;
  };

  render() {
    return <div onClick={this.update}>{this.state.count}</div>;
  }
}
```

**Good**

```jsx
class Example extends React.Component {
  state = {
    count: 0,
  };

  update = () => {
    this.setState((state) => ({ count: state.count + 1 }));
  };

  render() {
    return <div onClick={this.update}>{this.state.count}</div>;
  }
}
```

#### ESLint Rule

```json
{ "react/no-direct-mutation-state": "error" }
```

### String Refs

The legacy way of setting `ref`s on `class` components is to provide a `string` via the `ref` property. A property with that name is then used to assign a reference. This has long been deprecated and shouldn't be used.

#### Example

**Bad**

```jsx
class Example extends React.Component {
  myDiv = null;
  render() {
    return (
      <div ref="myDiv">
        <button ref="myButton">Click Me</button>
      </div>
    );
  }
}
```

**Good**

```jsx
class Example extends React.Component {
  myDiv = null;
  render() {
    return (
      <div
        ref={(ref) => {
          this.myDiv = ref;
        }}
      >
        <button ref="myButton">Click Me</button>
      </div>
    );
  }
}
```

#### ESLint Rule

```json
{ "react/no-string-refs": "error" }
```

### Prefer ES6 Classes

React offers you two ways to create traditional components: using the ES5 `create-react-class` module or the new ES6 class system. We recommend using functional components whenever possible. When not possible, however we recommend using `class` native to ES6.

#### Example

**Bad**

```jsx
const Hello = createReactClass({
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});
```

**Good**

```jsx
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
```

#### ESLint Rule

```json
{ "react/prefer-es6-class": ["error", "always"] }
```

### `return` in `render`

When the `render` method does not `return` anything it's an invalid component. It is likely this is done by mistake.

#### Example

**Bad**

```jsx
class Hello extends React.Component {
  render() {
    console.log("hello");

    <div>Hello {this.props.name}</div>;
  }
}
```

**Good**

```jsx
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
```

#### ESLint Rule

```json
{ "react/require-render-return": "error" }
```

### Ordering Class Component Methods

When using ES6 classes, it's important to order the methods in the class declaration. This can help reduce decisions having to be made as well as improve searchability and reduce merge conflicts.

#### ESLint Rule

```json
{
  "react/sort-comp": [
    "error",
    {
      "order": [
        "static-variables",
        "static-methods",
        "instance-variables",
        "lifecycle",
        "/^handle.+$/",
        "/^on.+$/",
        "getters",
        "setters",
        "/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
        "instance-methods",
        "everything-else",
        "rendering"
      ],
      "groups": {
        "lifecycle": [
          "displayName",
          "propTypes",
          "contextTypes",
          "childContextTypes",
          "mixins",
          "statics",
          "defaultProps",
          "constructor",
          "getDefaultProps",
          "getInitialState",
          "state",
          "getChildContext",
          "getDerivedStateFromProps",
          "componentWillMount",
          "UNSAFE_componentWillMount",
          "componentDidMount",
          "componentWillReceiveProps",
          "UNSAFE_componentWillReceiveProps",
          "shouldComponentUpdate",
          "componentWillUpdate",
          "UNSAFE_componentWillUpdate",
          "getSnapshotBeforeUpdate",
          "componentDidUpdate",
          "componentDidCatch",
          "componentWillUnmount"
        ],
        "rendering": ["/^render.+$/", "render"]
      }
    }
  ]
}
```

### `shouldComponentUpdate` in `PureComponent`

It is pointless to `extend` `PureComponent` and override `shouldComponentUpdate`. `PureComponent` adds an implementation of `shouldComponentUpdate` on top of `Component`, so when you override it, you go against the expectations of the reader when your code is inspected.

#### Example

**Bad**

```jsx
class Example extends PureComponent {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return <div>{this.props.name}</div>;
  }
}
```

**Good**

```jsx
class Example extends Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return <div>{this.props.name}</div>;
  }
}

class Example extends PureComponent {
  render() {
    return <div>{this.props.name}</div>;
  }
}
```

#### ESLint Rule

```json
{ "react/no-redundant-should-component-update": "error" }
```

### Redundant State

When using `state` in a class component, you should make sure that you are in fact using the properties you set on your state object. Leaving in `state` after a refactoring is a common mistake.

#### Example

**Bad**

```jsx
class Example extends React.Component {
  state = {
    name: "",
  };

  render() {
    return <div>{this.props.name}</div>;
  }
}
```

**Good**

```jsx
class Example extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}
```

#### ESLint Rule

```json
{ "react/no-unused-state": "error" }
```

### Accessing `this.state` in `setState`

It is a common pattern to refer to a previous state of a component in a `setState` call to apply a state that is derived from the previous state.

Because `setState` calls are batched, there is no guarantee that upon directly referencing `this.state` you will be accessing the values that you actually want. This is why `setState` also accepts a callback function as an argument, which has `state` as its first argument. Using this is safe and we recommend to use it instead of `this.state`.

#### Example

**Bad**

```jsx
class Pagination extends React.Component {
  state = {
    currentPage: 1,
  };

  next = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  render() {
    return (
      <div>
        <button onClick={this.next}>Next</button>
        <span>{this.state.currentPage}</span>
      </div>
    );
  }
}
```

**Good**

```jsx
class Pagination extends React.Component {
  state = {
    currentPage: 1,
  };

  next = () => {
    this.setState(({ currentPage }) => ({ currentPage: currentPage + 1 }));
  };

  render() {
    return (
      <div>
        <button onClick={this.next}>Next</button>
        <span>{this.state.currentPage}</span>
      </div>
    );
  }
}
```

#### ESLint Rule

```json
{ "react/no-access-state-in-setstate": "error" }
```

### State Initialiser

We recommend using a class property to initialise state, instead of doing it in the constructor.

#### Example

**Bad**

```jsx
class Foo extends React.Component {
  render() {
    this.state = { bar: 0 };
    return <div>Foo</div>;
  }
}
```

**Good**

```jsx
class Foo extends React.Component {
  state = { bar: 0 };
  render() {
    return <div>Foo</div>;
  }
}
```

#### ESLint Rule

```json
{ "react/state-in-constructor": ["error", "never"] }
```

### Static Properties

`childContextTypes`, `contextTypes`, `contextType`, `defaultProps`, `displayName`, and `propTypes` can all be defined as static members of class components. We recommend using this approach instead of attaching them to the component after definition as it's more readable.

#### Example

**Bad**

```jsx
class MyComponent extends React.Component {
  static get childContextTypes() {
    /*...*/
  }
  static get contextTypes() {
    /*...*/
  }
  static get contextType() {
    /*...*/
  }
  static get displayName() {
    /*...*/
  }
  static get defaultProps() {
    /*...*/
  }
  static get propTypes() {
    /*...*/
  }
}
class MyComponent extends React.Component {
  /*...*/
}
MyComponent.childContextTypes = {
  /*...*/
};
MyComponent.contextTypes = {
  /*...*/
};
MyComponent.contextType = {
  /*...*/
};
MyComponent.displayName = "Hello";
MyComponent.defaultProps = {
  /*...*/
};
MyComponent.propTypes = {
  /*...*/
};
```

**Good**

```jsx
class MyComponent extends React.Component {
  static childContextTypes = {
    /*...*/
  };
  static contextTypes = {
    /*...*/
  };
  static contextType = {
    /*...*/
  };
  static displayName = "Hello";
  static defaultProps = {
    /*...*/
  };
  static propTypes = {
    /*...*/
  };
}
```

#### ESLint Rule

```json
{ "react/static-property-placement": ["error", "static public field"] }
```

### Arrow Functions as Lifecycle Methods

It is not neccessary to use arrow function for lifecycle methods. This makes things harder to test, conceptually less performant (although in practice, performance will not be affected, since most engines will optimize efficiently), and can break hot reloading patterns.

#### Example

**Bad**

```jsx
class Hello extends React.Component {
  render = () => {
    return <div />;
  };
}
```

**Good**

```jsx
class Hello extends React.Component {
  render() {
    return <div />;
  }
}
```

#### ESLint Rule

```json
{ "react/no-arrow-function-lifecycle": "error" }
```

### Unused Component Methods

We recommend removing unused component methods.

#### Example

**Bad**

```jsx
class Foo extends React.Component {
  handleClick() {}
  render() {
    return null;
  }
}
```

**Good**

```jsx
class Foo extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  action() {}
  componentDidMount() {
    this.action();
  }
  render() {
    return null;
  }
}
```

#### ESLint Rule

```json
{ "react/no-unused-class-component-methods": "error" }
```

<!-- end Class Components -->

## Function Components

### Prefer Function Components

Stateless functional components are simpler than class based components and will benefit from future React performance optimizations specific to these components.

#### Example

**Bad**

```jsx
class Example extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
```

**Good**

```jsx
const Example = (props) => {
  return <div>Hello {props.name}</div>;
};
```

#### ESLint Rule

```json
{
  "react/prefer-stateless-function": [
    "error",
    { "ignorePureComponents": false }
  ]
}
```

### Enforce Usage of Function Components

There are cases where function components may be used instead of class components using hooks to substitute lifecycle and state management.

#### Example

**Bad**

```jsx
class Example extends React.Component {
  state = { count: 0 };

  updateCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return <div onClick={this.updateCount}>Count: {this.state.count}</div>;
  }
}
```

**Good**

```jsx
const Example = () => {
  const [count, updateCount] = useReducer((state) => state + 1, 0);

  return <div onClick={updateCount}>Count: {count}</div>;
};

// As of now it's not possible to implement this via hooks
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

#### ESLint Rule

```json
{
  "react-prefer-function-component/react-prefer-function-component": [
    "error",
    { "allowComponentDidCatch": true }
  ]
}
```

### Referencing `this`

When converting class components to function components it's a common mistake to leave a reference to `this` inside of the component. This isn't technically incorrect, however will not work as expected, because function components aren't instantiated by React.

#### Example

**Bad**

```jsx
function Foo(props) {
  return <div>{this.props.bar}</div>;
}
```

**Good**

```jsx
function Foo(props) {
  return <div>{props.bar}</div>;
}
```

#### ESLint Rule

```json
{ "react/no-this-in-sfc": "error" }
```

### Function Style

We recommend following these rules when writing function component and deciding between arrow and `function` syntax.

1. Use `function` declaration for `export default`
2. Use arrow functions for everything else
3. Always name your components - this helps debugging and enables tools like Hot Module Replacement to work

#### Example

**Bad**

```jsx
const Example = function () {
  return <div>Hello</div>;
};

function Example() {
  return <div>Hello</div>;
}
```

**Good**

```jsx
export default function Example() {
  return <div>Hello</div>;
}

const Example = () => {
  return <div>Hello</div>;
};
```

#### ESLint Rule

> NOTE: this rule is a custom version of `react/function-component-definition` from `@superbet/eslint-plugin-react`.

```json
{
  "@superbet/react/function-component-definition": [
    "error",
    {
      "namedComponents": "arrow-function",
      "unnamedComponents": "arrow-function",
      "defaultExport": {
        "namedComponents": "function-declaration",
        "unnamedComponents": "function-expression"
      }
    }
  ]
}
```

<!-- end Function Components -->

## Props

### Forbidden PropTypes

Some PropTypes have more specific alternatives available. We recommend always using the more specific ones whenever possible.

#### Example

**Bad**

```typescript
Component.propTypes = {
  a: PropTypes.any,
  r: PropTypes.array,
  o: PropTypes.object,
};
```

**Good**

```typescript
Component.propTypes = {
  a: PropTypes.shape({}),
  r: PropTypes.arrayOf(PropTypes.number()),
  o: PropTypes.shape({ something: PropTypes.string() }),
};
```

#### ESLint Rule

```json
{
  "react/forbid-prop-types": [
    "error",
    {
      "forbid": ["any", "array", "object"],
      "checkContextTypes": true,
      "checkChildContextTypes": true
    }
  ]
}
```

### `key` Prop

When iterating over a data structure and returning a React element for each item, it is recommended to use `key` prop to avoid unnecessary re-renders and optimise performance.

What is a correct `key`?

The following examples are correct keys:

- `key={index}` - when iterating over an array that has an ordering that **cannot change**, e.g.: a list that can only be added to. If you're not sure whether your use-case matches this, don't use it.
- `key={item.id}` - this is the safest bet. A good `id` is a property that is unique to each item. `id` should not be transferrable between items and it should not change throughout the lifetime of the item.

The following examples are incorrect keys:

- `key={index}` in almost all cases.
- `key={null}` or `key={undefined}` - this does nothing.
- `key={item}` - using an object as the key will not produce the result you'd expect
- `key={JSON.stringify(item)}` - while this might seem like a good idea, in reality, it causes a forced re-render when any of `item`'s properties change.

#### ESLint Rule

> The rule for this is disabled, because it produces a lot of false positives.

### Boolean Props

When using a boolean attribute in JSX, you can set the attribute value to `true` or omit the value. This rule will enforce one or the other to keep consistency in your code.

#### Example

**Bad**

```jsx
const hello = <Hello personal={true} />;
```

**Good**

```jsx
const hello = <Hello personal />;
```

#### ESLint Rule

```json
{
  "react/jsx-boolean-value": ["error", "never", { "always": [] }],
  "react/no-array-index-key": "error"
}
```

### Event Handlers

To ensure consistency across a codebase, we recommend the following naming convention to be followed at all times when working with event handlers passed to components:

- `on` prefix for event handlers
- `on` or `handle` prefix for the function definitions or methods

#### Example

**Bad**

```jsx
<MyComponent handleChange={this.handleChange} />
<MyComponent onChange={this.componentChanged} />
```

**Good**

```jsx
<MyComponent onChange={this.handleChange} />
<MyComponent onChange={this.props.onFoo} />
```

#### ESLint Rule

```json
{ "react/jsx-handler-names": "error" }
```

### `.bind()` or Arrow Functions Inside Props

It is a common practice to use `.bind()` or arrow functions inside props to adjust the context of the function. This practice is not recommended because it causes a new render to be forced on each children that receive props this way, every time the parent renders.

This is because functions are compared via reference and `.bind()` creates a new reference (and therefore a new function) on each render. Same applies to this technique with arrow functions. This tricks React into thinking the prop has changed, and forces a new render.

#### Example

**Bad**

```jsx
class Example extends React.Component {
  handlePress() {
    this.props.onPress();
  }

  render() {
    return <Button onClick={this.handlePress.bind(this)}>Press Me!</Button>;
  }
}

class Example extends React.Component {
  handlePress() {
    this.props.onPress();
  }

  render() {
    return (
      <Button onClick={(event) => this.handlePress(event)}>Press Me!</Button>
    );
  }
}

const Example = ({ items, onItemSelected }) => {
  return (
    <div>
      {items.map((item) => {
        return (
          <Item key={item.id} {...item} onSelect={() => onItemSelected(item)} />
        );
      })}
    </div>
  );
};
```

**Good**

```jsx
class Example extends React.Component {
  constructor() {
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.onPress();
  }

  render() {
    return <Button onClick={this.handlePress}>Press Me!</Button>;
  }
}

class Example extends React.Component {
  handlePress = () => {
    this.props.onPress();
  };

  render() {
    return <Button onClick={this.handlePress}>Press Me!</Button>;
  }
}

// extract a component that's responsible for passing the `item` to `onSelect`
const ExampleItem = ({ onSelect, ...props }) => {
  const handleSelect = useCallback(() => {
    onSelect(props);
  }, [onSelect, props]);
  return (
    <div>
      <Item {...props} onSelect={handleSelect} />
    </div>
  );
};

const Example = ({ items, onItemSelected }) => {
  return (
    <div>
      {items.map((item) => {
        // use the extracted component that can now accept `onItemSelected` as is
        return (
          <ExampleItem key={item.id} {...item} onSelect={onItemSelected} />
        );
      })}
    </div>
  );
};
```

#### ESLint Rule

```json
{
  "react/jsx-no-bind": [
    "error",
    {
      "ignoreRefs": true,
      "allowArrowFunctions": false,
      "allowFunctions": false,
      "allowBind": false,
      "ignoreDOMComponents": true
    }
  ]
}
```

### Duplicate Props

It is recommended never to use duplicate props in JSX. While it's valid, just like in objects, the behaviour is that the last prop passed to the component will be used. This may not be what you want.

#### Example

**Bad**

```jsx
<Hello name="John" name="Doe" />
```

**Good**

```jsx
<Hello firstName="John" lastName="Doe" />
```

#### ESLint Rule

```json
{ "react/jsx-no-duplicate-props": ["error", { "ignoreCase": true }] }
```

### Not Defined Variables in JSX

To avoid `ReferenceError`s it is recommended to always check whether all variables used in JSX are defined. A common mistake may be to accidentally use the variable `Button` in a JSX expression, instead of `button`.

#### Example

**Bad**

```jsx
const Example = () => <Button>Click Me!</Button>;
```

**Good**

```jsx
const Button = ({ children }) => <button>{children}</button>;
const Example = () => <Button>Click Me!</Button>;
```

#### ESLint Rule

```json
{ "react/jsx-no-undef": "error" }
```

### Boolean Prop Naming

It is recommended to follow project conventions when naming props. We recommend treating them like any other property of any other object. We use `is|was|has|had` prefix for `boolean` properties.

#### Example

**Bad**

```jsx
const Button = ({ disabled, chilren }) => (
  <button disabled={disabled}>{children}</button>
);
```

**Good**

```jsx
const Button = ({ isDisabled, chilren }) => (
  <button disabled={isDisabled}>{children}</button>
);
```

#### ESLint Rule

```json
{
  "react/boolean-prop-naming": [
    "error",
    {
      "propTypeNames": ["bool"],
      "rule": "^(is|was|has|had)[A-Z]([A-Za-z0-9]?)+",
      "message": "Boolean prop \"{{ propName }}\" should be prefixed with \"is\", \"was\", \"has\", or \"had\""
    }
  ]
}
```

### No Danger

Dangerous properties in React are those whose behavior is known to be a common source of application vulnerabilities. The properties names clearly indicate they are dangerous and should be avoided unless great care is taken.

#### Example

**Bad**

```jsx
const Hello = <div dangerouslySetInnerHTML={{ __html: "Hello World" }}></div>;
```

**Good**

```jsx
const Hello = <div>Hello World</div>;
```

#### ESLint Rule

```json
{ "react/no-danger": "error" }
```

### `dangerouslySetInnerHTML` + `children`

It is possible to use the `dangerouslySetInnerHTML` property to inject arbitrary HTML into a JSX element. This does not stop you from being able to provide `children` as well, however, it is recommended to avoid using both properties at the same time. React will warn you if you do so.

#### Example

**Bad**

```jsx
const example = (
  <div dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</div>
);

const example = (
  <Hello dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</Hello>
);
```

**Good**

```jsx
const example = <div dangerouslySetInnerHTML={{ __html: "HTML" }} />;

const example = <Hello dangerouslySetInnerHTML={{ __html: "HTML" }} />;

const example = <div>Children</div>;

const example = <Hello>Children</Hello>;
```

#### ESLint Rule

```json
{ "react/no-danger-with-children": "error" }
```

### Unused PropTypes

Some unused props can creep into a codebase upon refactoring. We recommend always checking whether you need a prop on a component.

#### Example

**Bad**

```jsx
const Example = () => {
  return <div>Hello World</div>;
};

Hello.propTypes = {
  name: PropTypes.string,
};
```

**Good**

```jsx
const Example = ({ name }) => {
  return <div>Hello {name}</div>;
};

Hello.propTypes = {
  name: PropTypes.string,
};
```

#### ESLint Rule

```json
{
  "react/no-unused-prop-types": [
    "error",
    {
      "customValidators": [],
      "skipShapeProps": true
    }
  ]
}
```

### `style` Prop

In React, the style prop is special in the sense that contrary to the native HTML counterpart, where the attribute accepts a string of CSS, the style prop accepts an object of CSS properties.

It can be an easy mistake to make for beginners more familiar with HTML to pass a string to the `style` prop.

#### Example

**Bad**

```jsx
const example = <div style="color: 'red'" />;

const example = <div style={true} />;

const example = <Hello style={true} />;

const styles = true;
const example = <div style={styles} />;
```

**Good**

```jsx
const example = <div style={{ color: "red" }} />;

const example = <Hello isStyle />;

const styles = { color: "red" };
const example = <div style={styles} />;
```

#### ESLint Rule

```json
{ "react/style-prop-object": "error" }
```

### `children` Prop

There are two ways of providing `children` to a React component:

1. Using the `children` prop.
2. Using the JSX syntax.

We recommend always using the JSX syntax to provide `children` to a component.

#### Example

**Bad**

```jsx
const example = (
  <div>
    <Hello children={<p>Hello World</p>} />
  </div>
);
```

**Good**

```jsx
const example = (
  <div>
    <Hello>
      <p>Hello World</p>
    </Hello>
  </div>
);
```

#### ESLint Rule

```json
{ "react/no-children-prop": "error" }
```

### Cloning PropTypes

It is common practice to share `propTypes` between components, however when doing so by referencing the `.propTypes` property of a component, it is possible to introduce issues when Babel tries to strip `propTypes` from components during a production build.

To avoid this, we recommend exporting the `propTypes` object separately from the component.

#### Example

**Bad**

```jsx
// one.jsx
export const One = ({ times }) => {
  return (
    <p>
      1 * {times} = {1 * times}
    </p>
  );
};

One.propTypes = {
  times: PropTypes.number.isRequired,
};

// two.jsx
import One from "./one";

export const Two = ({ times }) => {
  return (
    <p>
      2 * {times} = {2 * times}
    </p>
  );
};

Two.propTypes = One.propTypes;
```

**Good**

```jsx
// one.jsx
export const One = ({ times }) => {
  return (
    <p>
      1 * {times} = {1 * times}
    </p>
  );
};

export const propTypes = {
  times: PropTypes.number.isRequired,
};

One.propTypes = propTypes;

// two.jsx
import { propTypes } from "./one";

export const Two = ({ times }) => {
  return (
    <p>
      2 * {times} = {2 * times}
    </p>
  );
};

Two.propTypes = propTypes;
```

#### ESLint Rule

```json
{ "react/forbid-foreign-prop-types": ["error", { "allowInPropTypes": true }] }
```

### Void Elements

Void elements are HTML elements that are known for not accepting children, such as `<img />`, `<br />`, `<hr />`, etc. Providing `children` to these elements is a mistake and should be avoided.

A common situation when one might be tempted to add `children` to a void element is when trying to use `img` as a background to other elements. This does not work however.

#### Example

**Bad**

```jsx
const example = (
  <img src="pretty_picture.avif">
    <MyComponent />
  </img>
);
```

**Good**

```jsx
const example = (
  <div style={relative}>
    <img src="pretty_picture.avif" />
    <div style={absoluteFill}>
      <MyComponent />
    </div>
  </div>
);
```

#### ESLint Rule

```json
{ "react/void-dom-elements-no-children": "error" }
```

### `defaultProps` Match `propTypes`

We actually recommend not using `defaultProps` and using default arguments instead, for performance reasons and because the React team had plans to deprecate `defaultProps` in the future.

When you must use `defaultProps` you should make sure that you provide values for all optional properties.

You should also avoid adding `defaultProps` definitions for `propTypes` that are not optional.

#### Example

**Bad**

```jsx
const Example = ({ one, two }) => {
  return (
    <div>
      {one}
      {two}
    </div>
  );
};

Example.propTypes = {
  one: PropTypes.string,
  two: PropTypes.string,
};

Example.defaultProps = {
  one: "one",
};
```

**Good**

```jsx
const Example = ({ one, two }) => {
  return (
    <div>
      {one}
      {two}
    </div>
  );
};

Example.propTypes = {
  one: PropTypes.string,
  two: PropTypes.string,
};

Example.defaultProps = {
  one: "one",
  two: "two",
};

// or even better:

const Example = ({ one = "one", two = "two" }) => {
  return (
    <div>
      {one}
      {two}
    </div>
  );
};

Example.propTypes = {
  one: PropTypes.string,
  two: PropTypes.string,
};
```

#### ESLint Rule

```json
{
  "react/default-props-match-prop-types": [
    "error",
    { "allowRequiredDefaults": false }
  ]
}
```

### Button `type`

The default `type` of a `button` element is `"submit"`, which can be inconvenient, because when nested within a `form` it will submit the form, causing a reload of the page unless the event is specificially instructed to prevent this.

We recommend always explicitly setting `type` on `button`.

#### Example

**Bad**

```jsx
const example = (
  <form>
    <button>Back</button>
    <input type="text" placeholder="Name" name="name" />
  </form>
);
```

**Good**

```jsx
const example = (
  <form>
    <button type="button">Back</button>
    <input type="text" placeholder="Name" name="name" />
  </form>
);
```

#### ESLint Rule

```json
{
  "react/button-has-type": [
    "error",
    {
      "button": true,
      "submit": true,
      "reset": true
    }
  ]
}
```

### Prop Spreading

We recommend avoiding prop spreading as it can lead to unnecessary renders and unexpected behaviour when adding or removing properties from an object.

#### Example

**Bad**

```jsx
const example = <App {...props} />;
const example = (
  <MyCustomComponent {...props} some_other_prop={some_other_prop} />
);
const example = <img {...props} />;
```

**Good**

```jsx
const { src, alt } = props;
const { one_prop, two_prop } = otherProps;
const example = <img src={src} alt={alt} />;
const example = <MyCustomComponent {...otherProps} />;
```

#### ESLint Rule

```json
{
  "react/jsx-props-no-spreading": [
    "error",
    {
      "html": "enforce",
      "custom": "enforce",
      "explicitSpread": "ignore",
      "exceptions": []
    }
  ]
}
```

### Exact Prop Types

It is recommended to use exact prop types when possible. This ensures that no props are passed to a component by accident.

#### Example

**Bad**

```jsx
const Example = ({ id }) => {
  return (
    <div>
      <MyComponent id={id} />
    </div>
  );
};

Example.propTypes = {
  id: PropTypes.string,
};
```

**Good**

```jsx
import exact from "prop-types-exact";

const Example = ({ id }) => {
  return (
    <div>
      <MyComponent id={id} />
    </div>
  );
};

Example.propTypes = exact({
  id: PropTypes.string,
});
```

#### ESLint Rule

```json
{ "react/prefer-exact-props": "error" }
```

<!-- end Props -->

## Naming

### Component Naming

Component names should follow PascalCase. Starting a component with a lowercase letter will cause it to not be usable in JSX. Using any other naming convention will just cause confusion.

#### Example

**Bad**

```jsx
<Test_component />
<TEST_COMPONENT />
<Styled.p />
```

**Good**

```jsx
<TestComponent />
<Title />
```

#### ESLint Rule

```json
{ "react/jsx-pascal-case": "error" }
```

<!-- end Naming -->

## JSX

### `import React from 'react';`

In codebases before `jsx-pragma` was added, it was necessary to import `React` from `react`. This is no longer necessary, however the majority of codebases might still have the import statement. It is recommended if you are using `jsx-pragma` to remove the import statement.

Adding the following config is the way to make ESLint aware of the new behavior:

```js
module.exports = {
  "jsx-runtime": {
    plugins: ["react"],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      jsxPragma: null, // for @typescript/eslint-parser
    },
  },
};
```

#### ESLint Rule

```json
{ "react/jsx-uses-react": ["error"] }
```

### Prevent Variables from Being Marked as Unused

Since 0.17.0 the `eslint` `no-unused-vars` rule does not detect variables used in JSX. This rule will find variables used in JSX and mark them as used.

This rule only has an effect when the `no-unused-vars` rule is enabled.

#### ESLint Rule

```json
{ "react/jsx-uses-vars": "error" }
```

### Unknown DOM Properties

In JSX all DOM properties and attributes should be camelCased to be consistent with standard JavaScript style. This can be a possible source of error if you are used to writing plain HTML.

#### Example

**Bad**

```jsx
const Hello = <div class="hello">Hello World</div>;
```

**Good**

```jsx
const Hello = <div className="hello">Hello World</div>;
```

#### ESLint Rule

```json
{ "react/no-unknown-property": "error" }
```

### Missing `React` Import

When using JSX, `<a />` expands to `React.createElement("a")`. Therefore the React variable must be in scope.

If you are using the `@jsx` pragma this rule will check the designated variable and not the React one.

> NOTE: when using new `jsx-runtime` this rule will be disabled.

#### Example

**Bad**

```jsx
const example = <p>Example</p>;
```

**Good**

```jsx
import React from "react";

const example = <p>Example</p>;
```

#### ESLint Rule

```json
{ "react/react-in-jsx-scope": "error" }
```

### Self-closing Component Tags

Components without children can be self-closed to avoid unnecessary extra closing tag.

#### Example

**Bad**

```jsx
const HelloJohn = <Hello name="John"></Hello>;
const HelloJohnCompound = <Hello.Compound name="John"></Hello.Compound>;
```

**Good**

```jsx
const HelloJohn = <Hello name="John" />;
const HelloJohnCompound = <Hello.Compound name="John" />;
```

#### ESLint Rule

```json
{ "react/self-closing-comp": "error" }
```

### Unsafe `target="_blank"`

When creating a JSX element that has an a tag, it is often desired to have the link open in a new tab using the `target="_blank"` attribute. Using this attribute unaccompanied by `rel="noreferrer noopener"`, however, is [a severe security vulnerability](https://mathiasbynens.github.io/rel-noopener/).

#### Example

**Bad**

```jsx
const example = <a target="_blank" href="http://example.com/"></a>;
const example = <a target="_blank" href={dynamicLink}></a>;
```

**Good**

```jsx
const example = <p target="_blank"></p>;
const example = (
  <a target="_blank" rel="noopener noreferrer" href="http://example.com"></a>
);
const example = <a target="_blank" href="relative/path/in/the/host"></a>;
const example = <a target="_blank" href="/absolute/path/in/the/host"></a>;
const example = <a></a>;
```

#### ESLint Rule

```json
{ "react/jsx-no-target-blank": ["error", { "enforceDynamicLinks": "always" }] }
```

### Filename Extension

We recommend always using the `.jsx` (or `.tsx` for TypeScript codebases) extension for files including JSX syntax. This convention can be used to optimise build process and other tooling, such as only applying ESLint rules related to JSX to files that contain JSX.

We also recommend not using `.jsx` extension for any file that does not contain JSX syntax.

#### ESLint Rule

```json
{
  "react/jsx-filename-extension": [
    "error",
    { "extensions": [".jsx", ".tsx"], "allow": "as-needed" }
  ]
}
```

### Accidental Comment Injection

A common issue seen on a handful of websites created with React is the confusion of how comments behave within JSX. Comments are awkward to use in JSX, and therefore we recommend avoiding them altogether whenever possible.

This rule prevents comments that will be injected as a string into the JSX element.

#### Example

**Bad**

```jsx
const Hello = () => {
  return <div>// empty div</div>;
};

const Hello = () => {
  return <div>/* empty div */</div>;
};
```

**Good**

```jsx
const Hello = () => {
  return <div>{/* empty div */}</div>;
};

const Hello = () => {
  return <div /* empty div */></div>;
};

const Hello = () => {
  return <div className={"foo" /* temp class */}></div>;
};

const DisplayComment = () => {
  return <div>{"/* This will be output as a text node */"}</div>;
};
```

#### ESLint Rule

```json
{ "react/jsx-no-comment-textnodes": "error" }
```

### Unescaped Entities

We recommend always escaping HTML entities. This will prevent you from accidentally terminating JSX elements or adding other unintended behaviour to your code. Escaped HTML entities signify that you intend them to be interpreted as text, not as HTML.

#### Example

**Bad**

```jsx
const example = (
  <MyComponent
    name="name"
    type="string"
    name="John"
    foo="bar"
    bar="baz"
    baz="quox"
  >
    {/* oops! */}
    x="y"> Body Text
  </MyComponent>
);

const example = <MyComponent>{"Text"}}</MyComponent>;
```

**Good**

```jsx
const example = <div>&gt;</div>;
const example = <div>{">"}</div>;
```

#### ESLint Rule

```json
{ "react/no-unescaped-entities": "error" }
```

### Curly Braces

We recommend using curly braces consistently for JSX elements. These are the rules to follow:

1. Do not use curly braces for props when unnecessary, e.g.: `<MyComponent prop="string" />`
2. Do not use curly braces for `children` when unnecessary, e.g.: `<MyComponent>string</MyComponent>`

#### Example

**Bad**

```jsx
const example = <input type={"text"} />;
const example = <div>{"text"}</div>;
```

**Good**

```jsx
const example = <input type="text" />;
const example = <div>text</div>;
```

#### ESLint Rule

```json
{
  "react/jsx-curly-brace-presence": [
    "error",
    { "props": "never", "children": "never" }
  ]
}
```

### `javascript:` URL Injection

In React 16.9 any URLs starting with [`javascript:` scheme](https://wiki.whatwg.org/wiki/URL_schemes#javascript:_URLs) log a warning. React considers the pattern as a [dangerous attack surface](https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#deprecating-javascript-urls). In a future major release, React will throw an error if it encounters a `javascript:` URL.

#### Example

**Bad**

```jsx
const example = <a href="javascript:"></a>;
const example = <a href="javascript:void(0)"></a>;
const example = <a href="j\n\n\na\rv\tascript:"></a>;
// React Router
const example = <Link to="javascript:"></Link>;
// Next.js
const example = (
  <Link href="javascript:">
    <a>Hello</a>
  </Link>
);
```

**Good**

```jsx
const example = <a href="some.url/something"></a>;
const example = <Link to="some.url/something"></Link>;
const example = (
  <Link href="some.url/something">
    <a>Hello</a>
  </Link>
);
```

#### ESLint Rule

```json
{
  "react/jsx-no-script-url": [
    "error",
    [
      {
        "name": "Link",
        "props": ["to", "href"]
      }
    ]
  ]
}
```

### Namespaces in JSX Tag Names

HTML namespaces are not supported by JSX so they should not be used.

#### Example

**Bad**

```jsx
<ns:TestComponent />
<Ns:TestComponent />

```

**Good**

```jsx
<TestComponent />
<TestComponent />

```

#### ESLint Rule

```json
{ "react/no-namespace": "error" }
```

### Invalid HTML Attributes

Although technically it is valid to provide any unknown attribute to HTML elements, we recommend not adding arbitrary attributes to your HTML elements created via JSX.

#### Example

**Bad**

```jsx
const example = <div rel="article" />;
```

**Good**

```jsx
const stylesheet = (
  <link rel="stylesheet" href="https://example.com/style.css" />
);
```

#### ESLint Rule

```json
{ "react/no-invalid-html-attribute": "error" }
```

<!-- end JSX -->

## Other

### Deprecated Features

We recommend clearing your codebase of deprecated features.

#### Example

**Bad**

```jsx
React.render(<MyComponent />, root);

React.unmountComponentAtNode(root);

React.findDOMNode(this.refs.foo);

React.renderToString(<MyComponent />);

React.renderToStaticMarkup(<MyComponent />);

React.createClass({
  /* Class object */
});

const propTypes = {
  foo: PropTypes.bar,
};

//Any factories under React.DOM
React.DOM.div();

import React, { PropTypes } from "react";

// old lifecycles (since React 16.9)
class Example extends React.Component {
  componentWillMount() {}
  componentWillReceiveProps() {}
  componentWillUpdate() {}
}
```

**Good**

```jsx
ReactDOM.render(<MyComponent />, root);

import { PropTypes } from "prop-types";

class Example extends React.Component {
  UNSAFE_componentWillMount() {}
  UNSAFE_componentWillReceiveProps() {}
  UNSAFE_componentWillUpdate() {}
}
```

#### ESLint Rule

```json
{ "react/no-deprecated": ["error"] }
```

### Unstable Components

Creating components inside components without memoization leads to unstable components. The nested component and all its children are recreated during each re-render. Given stateful children of the nested component will lose their state on each re-render.

React reconcilation performs element type comparison with [reference equality](https://github.com/facebook/react/blob/v16.13.1/packages/react-reconciler/src/ReactChildFiber.js#L407). The reference to the same element changes on each re-render when defining components inside the render block. This leads to complete recreation of the current node and all its children. As a result the virtual DOM has to do extra unnecessary work and [possible bugs are introduced](https://codepen.io/ariperkkio/pen/vYLodLB).

#### Example

**Bad**

```jsx
const Example = () => {
  const [count, setState] = useState(0);

  const UnstableComponent = () => {
    return <div>hello, {count}</div>;
  };

  return (
    <section>
      <UnstableComponent />
    </section>
  );
};
```

**Good**

```jsx
const StableComponent = ({ count }) => {
  return <div>hello, {count}</div>;
};

const Example = () => {
  const [count, setState] = useState(0);

  return (
    <section>
      <StableComponent count={count} />
    </section>
  );
};
```

#### ESLint Rule

```json
{ "react/no-unstable-nested-components": "error" }
```

<!-- end Other -->

## React Methods and Utilities

### Using `ReactDOM.render()` Return Value

When using `ReactDOM.render()` to render a React component tree, for legacy reasons, it returns a reference to the root `ReactComponent` instance. This won't always be the case, so relying on this mechanism is brittle. It's very easy to miss updating this should it be removed from React.

#### Example

**Bad**

```jsx
const inst = ReactDOM.render(<App />, document.body);
doSomethingWithInst(inst);
```

**Good**

```jsx
ReactDOM.render(<App ref={doSomethingWithInst} />, document.body);

ReactDOM.render(<App />, document.body, doSomethingWithInst);
```

#### ESLint Rule

```json
{ "react/no-render-return-value": "error" }
```

### `findDOMNode()`

Facebook will eventually deprecate `findDOMNode` as it blocks certain improvements in React in the future.

We recommend using `ref`s instead.

#### Example

**Bad**

```jsx
class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this).scrollIntoView();
  }
  render() {
    return <div />;
  }
}
```

**Good**

```jsx
class MyComponent extends Component {
  componentDidMount() {
    this.node.scrollIntoView();
  }
  render() {
    return <div ref={(node) => (this.node = node)} />;
  }
}
```

#### ESLint Rule

```json
{ "react/no-find-dom-node": "error" }
```

### Fragment Syntax

We recommend always using the shorthand (`<></>`) for fragments as it clearly distinguishes it from other components. The only exception is when you must provide a `key` prop to the fragment.

#### Example

**Bad**

```jsx
const example = (
  <Fragment>
    <div>
      <span>Hello</span>
    </div>
    <div>
      <span>World</span>
    </div>
  </Fragment>
);
```

**Good**

```jsx
const example = (
  <>
    <div>
      <span>Hello</span>
    </div>
    <div>
      <span>World</span>
    </div>
  </>
);

const example = (
  <>
    {items.map(({ id, name, description }) => {
      return (
        <Fragment key={id}>
          <h3>{name}</h3>
          <p>{description}</p>
        </Fragment>
      );
    })}
  </>
);
```

#### ESLint Rule

```json
{ "react/jsx-fragments": ["error", "syntax"] }
```

### Useless Fragments

There are some common cases where someone might use a fragment when it's not necessary to do so.

#### Example

**Bad**

```jsx
const example = <>{foo}</>;

const example = (
  <>
    <Foo />
  </>
);

const example = (
  <p>
    <>foo</>
  </p>
);

const example = <></>;

const example = <Fragment>foo</Fragment>;

const example = <React.Fragment>foo</React.Fragment>;

const example = (
  <section>
    <>
      <div />
      <div />
    </>
  </section>
);
```

**Good**

```jsx
const example = (
  <>
    <Foo />
    <Bar />
  </>
);

const example = <>foo {bar}</>;

const example = <> {foo}</>;

const cat = <>meow</>;

const example = (
  <SomeComponent>
    <>
      <div />
      <div />
    </>
  </SomeComponent>
);

const example = <Fragment key={item.id}>{item.value}</Fragment>;
```

#### ESLint Rule

```json
{ "react/jsx-no-useless-fragment": "error" }
```

### Passing References to Context

A common mistake that causes unnecessary re-renders is passing references that are defined inline to the `value` prop of a `Context.Provider`. Changing the reference of the value causes all of the components that depend on that context to re-render.

#### Example

**Bad**

```jsx
const Example = ({ children }) => {
  const [{ something, otherThing }, setState] = useState({
    something: "foo",
    otherThing: "bar",
  });
  return (
    <MyContext.Provider value={{ something, otherThing, foo: "bar" }}>
      {children}
    </MyContext.Provider>
  );
};

const Example = ({ children }) => {
  return (
    <MyContext.Provider value={() => console.log("Hello")}>
      {children}
    </MyContext.Provider>
  );
};
```

**Good**

```jsx
const Example = ({ children }) => {
  const [object, setState] = useState({
    something: "foo",
    otherThing: "bar",
  });

  const value = useMemo(() => {
    return { ...object, foo: "bar" };
  }, [object]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

const Example = ({ children }) => {
  const callback = useCallback(() => console.log("Hello"), []);
  return <MyContext.Provider value={callback}>{children}</MyContext.Provider>;
};
```

#### ESLint Rule

```json
{ "react/jsx-no-constructed-context-values": "error" }
```

<!-- end React Methods and Utilities -->
