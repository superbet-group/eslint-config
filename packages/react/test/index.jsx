const Hello = ({ firstName, lastName }) => (
  <>
    {firstName}, {lastName}
  </>
);

const hello = <Hello firstName="John" lastName="Smith" />;

const johnSmith = (
  <Hello
    firstName="John"
    language="en"
    occupation="engineer"
    slastName="Smith"
  />
);

const SomeVeryLongComponentName = () => null;

const longOne = (
  <SomeVeryLongComponentName>
    With a lot of content inside of it
  </SomeVeryLongComponentName>
);

const SpecialButton = ({ children }) => (
  <button type="button">{children}</button>
);

const specialButton = (
  <SpecialButton
    key={item.id}
    active
    primary
    description="World"
    disabled={isDisabled}
    name="John"
    title="Hello"
    onClick={signup}
  />
);

const Destructuring = ({ id }) => {
  return <div id={id} />;
};

const DestructuringInline = (props, context) => {
  const { id } = props;
  return <div id={id} />;
};

// eslint-disable-next-line react/prefer-stateless-function, react-prefer-function-component/react-prefer-function-component
class DestructuringClass extends React.PureComponent {
  render() {
    const { title } = this.context;
    return <div>{title}</div>;
  }
}

const conditionals = (
  <div>
    {foo && foo.bar && something && something.otherThing && anotherProperty}
  </div>
);

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  constructor(props) {
    super(props);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // log error
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

const MyApp = () => {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
};

const SideBar = () => <div>Sidebar</div>;

// eslint-disable-next-line react/prefer-stateless-function, react-prefer-function-component/react-prefer-function-component
class MyComponent extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <SideBar />
        {children}
      </div>
    );
  }
}

// eslint-disable-next-line react/prefer-stateless-function, react-prefer-function-component/react-prefer-function-component
class SetStateExample extends React.Component {
  state = {
    count: 0,
  };

  handleUpdate = () => {
    this.setState((state) => ({ count: state.count + 1 }));
  };

  render() {
    const { count } = this.state;
    return (
      <div
        role="button"
        tabIndex={-1}
        onClick={this.handleUpdate}
        onKeyDown={this.handleUpdate}
      >
        {count}
      </div>
    );
  }
}

// eslint-disable-next-line react/prefer-stateless-function, react-prefer-function-component/react-prefer-function-component
class StaticExample extends React.Component {
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

const PropTypesExample = ({ a, r, o }) => {
  return (
    <p>
      {a} {r} {o}
    </p>
  );
};

PropTypesExample.propTypes = {
  a: PropTypes.shape({}),
  o: PropTypes.shape({ something: PropTypes.string() }),
  r: PropTypes.arrayOf(PropTypes.number()),
};

const Button = ({ children, onClick }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);

// eslint-disable-next-line react/prefer-stateless-function, react-prefer-function-component/react-prefer-function-component
class ConstructorBoundCallback extends React.Component {
  constructor() {
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    const { onPress } = this.props;
    onPress();
  }

  render() {
    return <Button onClick={this.handlePress}>Press Me!</Button>;
  }
}

// eslint-disable-next-line react/prefer-stateless-function, react-prefer-function-component/react-prefer-function-component
class ArrowBoundCallback extends React.Component {
  handlePress = () => {
    const { onPress } = this.props;
    onPress();
  };

  render() {
    return <Button onClick={this.handlePress}>Press Me!</Button>;
  }
}

const Item = () => <div>Item</div>;

const ListCallbackItem = ({ onSelect, ...props }) => {
  const handleSelect = useCallback(() => {
    onSelect(props);
  }, [onSelect, props]);
  return (
    <div>
      <Item onSelect={handleSelect} />
    </div>
  );
};

const ListCallbackExample = ({ items, onItemSelected }) => {
  return (
    <div>
      {items.map((item) => {
        return <ListCallbackItem key={item.id} onSelect={onItemSelected} />;
      })}
    </div>
  );
};

const callback = () => {};

const App = () => (
  <div>
    <header>Hello</header>
    <main>World!</main>
  </div>
);

ReactDOM.render(<App />, document.body, callback);

// eslint-disable-next-line react/prefer-stateless-function, react-prefer-function-component/react-prefer-function-component
class ScrollIntoViewExample extends Component {
  componentDidMount() {
    this.node.scrollIntoView();
  }
  render() {
    return <div ref={(node) => (this.node = node)} />;
  }
}

const MyContext = createContext({});

const ContextObjectExample = ({ children }) => {
  const [object, setState] = useState({
    something: "foo",
    otherThing: "bar",
  });

  const value = useMemo(() => {
    return { ...object, foo: "bar" };
  }, [object]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

const ContextCallbackExample = ({ children }) => {
  const callback = useCallback(() => console.log("Hello"), []);
  return <MyContext.Provider value={callback}>{children}</MyContext.Provider>;
};
