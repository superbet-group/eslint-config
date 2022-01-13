---
title: Best Practices
description: Best practices for writing JavaScript applications, used by engineers at Superbet.
tags:
  - eslint
  - programming
  - best practices
  - guidelines
---

# Best Practices

Best practices for JavaScript codebases.

## Arrays

### Array methods should have a return statement in their callbacks

Array methods should always have a return statement in their callbacks when applicable. This helps prevent mistakenly not returning anything from a callback.

#### Example

**Bad**

```javascript
const example = [1, 2, 3];
const double = example.map(function (item) {
  item * 1;
});
```

**Good**

```javascript
const example = [1, 2, 3];
const double = example.map(function (item) {
  return item * 1;
});
```

#### ESLint rule

```json
{ "array-callback-return": ["error", { "allowImplicit": true }] }
```

## Variables

### `var` Keyword Scope

`var` keyword is not block scoped. This causes confusion when compared to `const` or `let`, which are both benefiting from being block scoped. It is actually not recommended to use `var` in JavaScript at all, see [rule for "no-var"](./es6.md) for explanation.

#### Example

**Bad**

```javascript
function doIfElse() {
  if (true) {
    var build = true;
  } else {
    var build = false;
  }
}
```

**Good**

```javascript
function doIfElse() {
  var build;

  if (true) {
    build = true;
  } else {
    build = false;
  }
}
```

#### ESLint rule

```json
{ "block-scoped-var": "error" }
```

### Empty Destructuring Pattern

It is technically possible to create an empty destructuring pattern, but it is not recommended as it is meaningless and is possible an indication of a mistake, e.g.: unfinished code or wrong syntax for default parameters.

#### Example

**Bad**

```javascript
const {} = event;
const {
  target: {},
} = event;
```

**Good**

```javascript
const { target } = event;
const {
  target: { value },
} = event;
```

#### ESLint Rule

```json
{ "no-empty-pattern": "error" }
```

### No Global Assign

It is disallowed to assign or re-assign values to native global properties. This makes the software brittle and hard to difficult to diagnose errors.

#### Example

**Bad**

```javascript
Object = null;
undefined = function haha() {};
```

#### ESLint Rule

```json
{ "no-global-assign": ["error", { "exceptions": [] }] }
```

### No Blocks

Before ES6 blocks `{}` didn't add any functionality and therefore it is advised not to use them to avoid confusion.

#### Example

**Bad**

```javascript
{
  var foo = bar();
}
```

#### ESLint Rule

```json
{ "no-lone-blocks": "error" }
```

### Usage of Primitive Wrapper Instances

There are three primitive types in JavaScript that have wrapper objects: string, number, and boolean. These are represented by the constructors `String`, `Number`, and `Boolean`, respectively. The primitive wrapper types are used whenever one of these primitive values is read, providing them with object-like capabilities such as methods. Behind the scenes, an object of the associated wrapper type is created and then destroyed, which is why you can call methods on primitive values.

The usage of these wrappers is confusing to other developers at best and behaves differently to what you would expect at worst.

#### Example

**Bad**

```javascript
const stringObject = new String("Hello world");
console.log(typeof stringObject); // "object" instead of "string"
```

**Good**

```javascript
const string = "Hello world";
console.log(typeof stringObject); // "string" as expected
string.substring(0, string.length - 1); // "Hello worl" <- still able to access properties on String.prototype due to autoboxing
```

#### ESLint Rule

```json
{ "no-new-wrappers": "error" }
```

### Non-octal Escape

Some problems reported by this rule are manually fixable by editor suggestions.

Although not being specified in the language until ECMAScript 2021, `\8` and `\9` escape sequences in string literals were allowed in most JavaScript engines, and treated as "useless" escapes:

```javascript
"8" === "8"; // true
"9" === "9"; // true
```

Since ECMAScript 2021, these escape sequences are specified as non-octal decimal escape sequences, retaining the same behavior.

Nevertheless, the ECMAScript specification treats `\8` and `\9` in string literals as a legacy feature. This syntax is optional if the ECMAScript host is not a web browser. Browsers still have to support it, but only in non-strict mode.

Regardless of your targeted environment, these escape sequences shouldn't be used when writing new code.

#### ESLint Rule

```json
{ "no-nonoctal-decimal-escape": "error" }
```

### Octal Numerals

Octal literals are numerals that begin with a leading zero, such as:

```javascript
let num = 071; // 57
```

Because the leading zero which identifies an octal literal has been a source of confusion and error in JavaScript code, ECMAScript 5 deprecates the use of octal numeric literals.

#### ESLint Rule

```json
{ "no-octal": "error" }
```

### No Octal Escape Sequences

of the ECMAScript 5 specification, octal escape sequences in string literals are deprecated and should not be used. Unicode escape sequences should be used instead.

```javascript
let foo = "Copyright \251";
```

#### ESLint Rule

```json
{ "no-octal-escape": "error" }
```

### No Redeclare

Variables declared with `var` can be redeclared within the same scope. This can cause confusing behaviour. It's best to just create a new variable with a different name.

#### Example

**Bad**

```javascript
var example = "Hello world";
var example = 12;
```

**Good**

```javascript
var example = "Hello world";
var anotherExample = 12;
```

#### ESLint Rule

```json
{ "no-redeclare": "error" }
```

### Self-Assigning

Re-assigning a variable to itself is most likely a mistake as it does nothing.

#### Example

**Bad**

```javascript
foo = foo;

[a, b] = [a, b];
```

**Good**

```javascript
foo = bar;
[a, b] = [b, a];
```

#### ESLint Rule

```json
{
  "no-self-assign": [
    "error",
    {
      "props": true
    }
  ]
}
```

### Comma Sequences

The comma operator includes multiple expressions where only one is expected. It evaluates each operand from left to right and returns the value of the last operand. However, this frequently obscures side effects, and its use is often an accident.

#### Example

**Bad**

```javascript
const a = require("a"),
  b = require("b"),
  c = require("c");

var a = (3, 5); // a = 5

(a = b += 5), a + b;

while (((a = next()), a && a.length));

(0, eval)("doSomething();");
```

**Good**

```javascript
const a = require("a");
const b = require("b");
const c = require("c");

const a = 5;
// etc...
```

#### ESLint Rule

```json
{ "no-sequences": "error" }
```

### No Unnecessary Concatenation

It is sometimes practice to concatenate strings together to break them apart into multiple lines. This is unnecessary and can lead to confusion. To better view long strings that span multiple lines, most modern editors will have an option to break lines.

#### Example

**Bad**

```javascript
let a = `some` + `string`;
```

**Good**

```javascript
let a = `somestring`;
```

#### ESLint Rule

```json
{ "no-useless-concat": "error" }
```

### Unnecessary Escapes

Escaping non-special characters in strings, template literals, and regular expressions doesn't have any effect, as demonstrated in the following example:

#### Example

**Bad**

```javascript
let foo = "hola"; // > foo = "hola"
let bar = `${foo}\!`; // > bar = "hola!"
let baz = /\:/; // same functionality with /:/
```

**Good**

```javascript
let foo = '"';
let bar = "'";
let baz = "\x12";
```

#### ESLint Rule

```json
{ "no-useless-escape": "error" }
```

### Do Not Use `void`

The void operator takes an operand and returns undefined: void expression will evaluate expression and return undefined. It can be used to ignore any side effects expression may produce:

The common case of using void operator is to get a "pure" undefined value as prior to ES5 the undefined variable was mutable:

```javascript
// will always return undefined
(function () {
  return void 0;
})();

// will return 1 in ES3 and undefined in ES5+
(function () {
  undefined = 1;
  return undefined;
})();

// will throw TypeError in ES5+
(function () {
  "use strict";
  undefined = 1;
})();
```

Another common case is to minify code as void 0 is shorter than undefined:

```javascript
foo = void 0;
foo = undefined;
```

When used with IIFE (immediately-invoked function expression), void can be used to force the function keyword to be treated as an expression instead of a declaration:

```javascript
var foo = 1;
void function(){ foo = 1; }() // will assign foo a value of 1
+function(){ foo = 1; }() // same as above
function(){ foo = 1; }() // will throw SyntaxError
```

We recommend not using the `void` operator, because it is non-obvious and hard to read.

#### ESLint Rule

```json
{ "no-void": "error" }
```

### `with` Statement

There is a lesser known feature of JavaScript called `with` statement. This is disabled in strict mode in ES6+ and for a good reason. The first and most common use case of `with` is to cause confusion and amiguity. In other cases it's used to "merge" an object's properties together with the current scope, extending it for the duration of the statement.

One of the biggest reasons to avoid using this feature is the fact that it's not portable between environments.

#### Example

**Bad**

```javascript
function example(item, values) {
  with (item) {
    console.log(values);
  }
}
example([1, 2, 3], someObj); // What's logged here?
```

If you call `example([1,2,3], someObj)` in an ECMAScript 5 environment, then the values reference inside the with statement will resolve to obj. However, ECMAScript 2015 introduces a `values` property on `Array.prototype` (so that it will be available on every array). So, in a JavaScript environment that supports ECMAScript 2015, the `values` reference inside the with statement could resolve to `[1,2,3].values`. However, in this particular example, `Array.prototype` has been defined with values in its [`Symbol.unscopables`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables) object. If it were not, one can see how this would be a difficult issue to debug.

Valid use case for `with` (**still bad**):

```javascript
with (Math) {
  console.log(PI * sin(12));
}
```

**Good**

```javascript
const m = Math;
console.log(m.PI * m.sin(12));
```

#### ESLint Rule

```json
{ "no-with": "error" }
```

### Unnecessary `RegExp` Wrapping

It is possible to use `RegExp` constructor to create a regular expression. However, it is not necessary to do so. The constructor is useful for creating regular expressions dynamically, e.g.: adjusting the flags or adding a dynamic pattern.

#### Example

**Bad**

```javascript
new RegExp("^\\d\\.$");
```

**Good**

```javascript
/^\d\.$/;
```

#### ESLint Rule

```json
{
  "prefer-regex-literals": [
    "error",
    {
      "disallowRedundantWrapping": true
    }
  ]
}
```

### Radix

The `radix` is the second argument of `parseInt` function. It is used to specify the base of the number. As a developer, you'd expect the `radix` to default to `10`, but it's not always the case. Therefore it is advised to always explicitly specify the `radix` when using `parseInt`.

#### Example

**Bad**

```javascript
const num = parseInt("071"); // 57
```

**Good**

```javascript
const num = parseInt("071", 10); // 71
```

#### ESLint Rule

```json
{ "radix": "error" }
```

### Variables on Top

`var`iable declarations are hoisted to the top of the current scope. It is therefore recommended to not let the engine implicitly hoist variables, but instead declare them explicitly on top of their scope. This does not apply to `const` and `let` declarations as they are not hoisted.

#### Example

**Bad**

```javascript
function doSomething() {
  if (true) {
    var first = true;
  }
  var second;
}
function loopIt() {
  for (var i = 0; i < 10; i++) {}
}
```

**Good**

```javascript
function doSomething() {
  var first;
  var second;
  if (true) {
    first = true;
  }
}
function loopIt() {
  var i;
  for (i = 0; i < 10; i++) {}
}
```

#### ESLint Rule

```json
{ "vars-on-top": "error" }
```

<!-- end Variables -->

## Classes

We recommend using a functional style of programming instead of OOP and as such you should generally avoid using classes. If you must use classes for whatever reason, there are a few best practices to follow.

### Property accessors

It is not recommended to use property accessors (getters and setters). Instead, use private and public properties respectively. Creating accessors has the unnecessary overhead of contructing a new closure.

### Example

**Bad**

```javascript
const example = {
  _myProperty: "value",

  // don't do this
  get myProperty() {
    return this._myProperty;
  },
};
```

**Good**

```javascript
const example = {
  myProperty: "value",
};
```

### ESLint rule

```json
{ "accessor-pairs": "off" }
```

In modern codebases, wherever possible, functional programming should be employed in place of classes. That said, there are a couple of rules that should be followed when using classes.

### All methods in classes should use `this`

To ensure that the use of a class is in fact warranted, the context of that class should always be accessed explicitly, otherwise the same functionality can be achieved with a `function`.

**Bad**

```javascript
class Example {
  random() {
    return Math.floor(Math.random() * 10);
  }
}
```

**Good**

```javascript
class Example {}

const random = () => {
  return Math.floor(Math.random() * 10);
};
```

### ESLint rule

```json
{
  "class-methods-use-this": [
    "error",
    {
      "exceptMethods": []
    }
  ]
}
```

### Accessor pairs

If you're using accessor pairs you should group them together so that it's apparent to the reader what the shape of the instance of that class looks like.

**Bad**

```javascript
class Example {
  _myProperty;

  get myProperty() {
    return this._myProperty;
  }

  otherProperty = "value";

  set myProperty(value) {
    this._myProperty = value;
  }
}
```

**Good**

```javascript
class Example {
  _myProperty;

  get myProperty() {
    return this._myProperty;
  }

  set myProperty(value) {
    this._myProperty = value;
  }
}
```

### ESLint rule

```json
{ "grouped-accessor-pairs": "error" }
```

### Max classes per file

A class should represent a logical unit, which is why it's often encouraged to have a maximum of one class per file. However it is not always convenient for readability and navigability of the codebase, so it is actually a wrongly prohibiting rule.

### ESLint rule

```json
{ "max-classes-per-file": "off" }
```

### Return in Contructor

In JavaScript, returning a value in the constructor of a class may be a mistake. Forbidding this pattern prevents mistakes resulting from unfamiliarity with the language or a copy-paste error.

#### Example

**Bad**

```javascript
class A {
  constructor(a) {
    this.a = a;
    return a;
  }
}

class B {
  constructor(f) {
    if (!f) {
      return "falsy";
    }
  }
}
```

**Good**

```javascript
class C {
  constructor(c) {
    this.c = c;
  }
}

class D {
  constructor(f) {
    if (!f) {
      return; // Flow control.
    }

    f();
  }
}
```

#### ESLint rule

```json
{ "no-constructor-return": "error" }
```

### Usage of a Constructor for Side Effects

It is bad practice and discouraged to rely on a constructor for its side effects to produce functionality, while ignoring the produced instance.

#### Example

**Bad**

```javascript
class NavigationLink {
  constructor(myUrl) {
    window.open(myUrl);
  }
}

new NavigationLink();
```

**Good**

```javascript
class NavigationLink {
  constructor(myUrl) {
    this.url = myUrl;
  }

  navigate() {
    window.open(this.url);
  }
}

const link = new NavigationLink();
link.navigate();
```

#### ESLint Rule

```json
{ "no-new": "error" }
```

<!-- end Classes -->

## Functions

### Consistent return

We recommend a function to either return a value or be `void` (do not return a value), but try to avoid conditionally returning a value or nothing. To signify that a function wants to return an empty values, explicit return of `null` is advised.

#### Example

**Bad**

```javascript
function doSomething(condition) {
  if (condition) {
    return true;
  } else {
    return;
  }
}
```

**Good**

```javascript
function doSomething(condition) {
  if (condition) {
    return true;
  } else {
    return null;
  }
}
```

#### ESLint rule

```json
{ "consistent-return": "error" }
```

### Default Parameters Go Last

In functions it is advised to put the arguments with default values to the end of the argument list. This helps by allowing users of the function to omit the final arguments that do have a default value.

#### Example

**Bad**

```javascript
function example(first, second, third) {
  second = second || "default";
  // ...
}
```

**Good**

```javascript
function example(first, second, third) {
  third = third || "default";
  // ...
}
```

#### ESLint rule

```json
{ "default-param-last": "error" }
```

### Caller or Callee

The use of `arguments.caller` and `arguments.callee` make several code optimizations impossible. They have been deprecated in future versions of JavaScript and their use is forbidden in ECMAScript 5 while in strict mode. It is generally advised to use ES6 rest parameters instead of `arguments` to collect variadic parameters.

#### Example

**Bad**

```javascript
function foo() {
  var callee = arguments.callee;
}
```

> NOTE: ES6 arrow functions do not have access to `arguments`, which enforces this rule even better.

#### ESLint Rule

```json
{ "no-caller": "error" }
```

### No Empty Function

Empty functions are generally meaningless and so are discouraged. If you must have a function that does nothing, you can always explicitly return `undefined`.

#### Example

**Bad**

```javascript
function example() {}
```

**Good**

```javascript
function noop() {
  return undefined;
}
```

> NOTE: it is a good idea to avoid creating a function each time you need a `noop`, e.g.: in case you want to provide a default argument as a callback instead of adding an extra control statement. You can add a `noop` function to the utilities directory and `import` it everywhere you need it.

#### ESLint Rule

```json
{ "no-empty-function": "error" }
```

### No `eval`

Use of the `eval` function is forbidden. JavaScript's `eval()` function is potentially dangerous and is often misused. Using `eval()` on untrusted code can open a program up to several different injection attacks. The use of `eval()` in most contexts can be substituted for a better, alternative approach to a problem.

#### Example

**Bad**

```javascript
const obj = { x: "foo" };
const key = "x";
const value = eval("obj." + key);
```

**Good**

```javascript
const obj = { x: "foo" };
const key = "x";
const value = obj[key];
```

#### ESLint Rule

```json
{ "no-eval": "error" }
```

### Monkey-Patching

It is possible to extend any existing JavaScript object (including prototypes, such as Object.prototype) by adding new properties and methods. This is generally discouraged, as it can lead to unexpected behavior and security issues. It is also discouraged to modify the `prototype` of an existing object, regardless of whether it's a native built-in object or not.

> NOTE: popular ES6 `Array.prototype.includes` method is a good example of this rule not being followed by the web community. The original naming was meant to follow Java by using `contains()` instead of `includes()` [as evidenced by this discussion](https://esdiscuss.org/topic/array-prototype-contains), however the amount of monkey-patched `Array.prototype.contains` found on the web prohibited this name from being used.

#### Example

**Bad**

```javascript
String.prototype.isPalindrome = function () {
  return this.split("").reverse().join("") === this;
};
```

**Good**

```javascript
function isPalindrome(candidate) {
  return (
    String.prototype.split.call(candidate, "").reverse().join("") === candidate
  );
}
```

#### ESLint Rule

```json
{ "no-extend-native": "error" }
```

### No Unnecessary `.bind()`

The `bind()` method is used to create functions with specific this values and, optionally, binds arguments to specific values. When used to specify the value of `this`, it's important that the function actually uses `this` in its function body. Sometimes during the course of code maintenance, the `this` value is removed from the function body. In that case, you can end up with a call to `bind()` that doesn't accomplish anything.

#### Example

**Bad**

```javascript
function notBound() {
  return "hello";
}

notBound.bind(someObject);
```

**Good**

```javascript
function notBound() {
  return this.hello;
}

notBound.bind({ hello: "Hello" });
```

#### ESLint Rule

```json
{ "no-extra-bind": "error" }
```

### No Implied `eval()`

It's considered a good practice to avoid using `eval()` in JavaScript. There are security and performance implications involved with doing so, which is why many linters (including ESLint) recommend disallowing `eval()`. However, there are some other ways to pass a string and have it interpreted as JavaScript code that have similar concerns.

The first is using `setTimeout()`, `setInterval()` or `execScript()` (Internet Explorer only), all of which can accept a string of JavaScript code as their first argument.

#### Example

**Bad**

```javascript
setTimeout("alert('Hi!');", 100);
```

**Good**

```javascript
setTimeout(function () {
  alert("Hi!");
}, 100);
```

#### ESLint Rule

```json
{ "no-implied-eval": "error" }
```

### No Function Constructor

The usage of `Function()` is discouraged. It's generally considered a bad practice to use it to create a function. Instead, you should use a function expression or a function declaration.

#### Example

**Bad**

```javascript
var x = new Function("a", "b", "return a + b");
```

**Good**

```javascript
function x(a, b) {
  return a + b;
}
```

#### ESLint Rule

```json
{ "no-new-func": "error" }
```

### No Param Reassign

Assignment to variables declared as function parameters can be misleading and lead to confusing behavior, as modifying function parameters will also mutate the `arguments` object. Often, assignment to function parameters is unintended and indicative of a mistake or programmer error.

This rule can be also configured to fail when function parameters are modified. Side effects on parameters can cause counter-intuitive execution flow and make errors difficult to track down.

#### Example

**Bad**

```javascript
function set13(value) {
  value = 13;
}

function increment(value) {
  value++;
}
```

**Good**

```javascript
function foo(bar) {
  const baz = bar;
}
```

There are of course exceptions to this rule, where it makes sense and in fact desired to re-assign a function's parameters.

For example [immer](https://immerjs.github.io/immer/) has an API that promotes re-assigning function parameters.

```javascript
import { produce } from "immer";

produce((draft) => {
  draft.foo = "bar";
});
```

> NOTE: exceptions are added to the ESLint rule

#### ESLint Rule

```json5
{
  "no-param-reassign": [
    "error",
    {
      props: true,
      ignorePropertyModificationsFor: [
        "acc", // for reduce accumulators
        "accumulator", // for reduce accumulators
        "e", // for e.returnvalue
        "ctx", // for Koa routing
        "context", // for Koa routing
        "req", // for Express requests
        "request", // for Express requests
        "res", // for Express responses
        "response", // for Express responses
        "$scope", // for Angular 1 scopes
        "staticContext", // for ReactRouter context
        "draft", // for immer
        "state", // for Redux state with immer
      ],
    },
  ],
}
```

### Assignment in `return` Statement

One of the interesting, and sometimes confusing, aspects of JavaScript is that assignment can happen at almost any point. Because of this, an errant equals sign can end up causing assignment when the true intent was to do a comparison. This is especially true when using a `return` statement. For example:

```javascript
function doSomething() {
  return (foo = bar + 2);
}
```

It is difficult to tell the intent of the `return` statement here. It's possible that the function is meant to `return` the result of `bar + 2`, but then why is it assigning to `foo`? It's also possible that the intent was to use a comparison operator such as `==` and that this code is an error.

Because of this ambiguity, it's considered a best practice to not use assignment in `return` statements.

#### ESLint Rule

```json
{ "no-return-assign": ["error", "always"] }
```

### Script URLs

Using `javascript:` URLs is considered by some as a form of eval. Code passed in `javascript:` URLs has to be parsed and evaluated by the browser in the same way that `eval` is processed.

#### Example

```javascript
location.href = "javascript:void(0)";
```

#### ESLint Rule

```json
{ "no-script-url": "error" }
```

### Useless `return` Statements

A `return;` statement with nothing after it is redundant, and has no effect on the runtime behavior of a function. This can be confusing, so it's better to disallow these redundant statements.

#### Example

**Bad**

```javascript
function foo() {
  return;
}

function foo() {
  doSomething();
  return;
}

function foo() {
  if (condition) {
    bar();
    return;
  } else {
    baz();
  }
}

function foo() {
  switch (bar) {
    case 1:
      doSomething();
    default:
      doSomethingElse();
      return;
  }
}
```

**Good**

```javascript
function foo() {
  return 5;
}

function foo() {
  return doSomething();
}

function foo() {
  if (condition) {
    bar();
    return;
  } else {
    baz();
  }
  qux();
}

function foo() {
  switch (bar) {
    case 1:
      doSomething();
      return;
    default:
      doSomethingElse();
  }
}

function foo() {
  for (const foo of bar) {
    return;
  }
}
```

#### ESLint Rule

```json
{ "no-useless-return": "error" }
```

### Wrap Immidiately Invoked Function Expressions

You can immediately invoke function expressions, but not function declarations. A common technique to create an immediately-invoked function expression (IIFE) is to wrap a function declaration in parentheses. The opening parentheses causes the contained function to be parsed as an expression, rather than a declaration.

#### Example

**Bad**

```javascript
var x = (function () {
  return { y: 1 };
})();
```

**Good**

```javascript
var x = (function () {
  return { y: 1 };
})();
```

#### ESLint Rule

```json
{ "wrap-iife": ["error", "outside", { "functionPrototypeMethods": false }] }
```

<!-- end Functions -->

## Stylistic Best Practices

### Curly Braces

It is recommended to write code that always includes curly braces around blocks, even when it technically shouldn't be necessary. This helps to make it easier to read and understand the code, and also helps avoid the possibility of introducing unwanted syntax errors in the codebase.

#### Example

**Bad**

```javascript
if (true) console.log("Hello");
```

**Good**

```javascript
if (true) {
  console.log("Hello");
}
```

#### ESLint rule

```json
{ "curly": ["error", "all"] }
```

### Dot Notation

We encourage the usage of dot notation style to access object properties, whenever possible. It's less characters to type and the majority of modern editors will be able to give a suggestion as to what properties are accessible when pressing that `.` key.

Having a consistent style also increases searchability of the codebase. For example, if I want to access every object that has a property `.something` that is read or written to at some point in my application, I can search for all occurrences of `".something"` and easily find all the places where it is used.

#### Example

**Bad**

```javascript
example["myProperty"];
```

**Good**

```javascript
example.myProperty;
```

### Dot Position

We recommend in multiline statements to always carry the dot with the property or method being accessed to reduce confusion around what the purpose of that line of code represents.

#### ESLint Rule

```json
{ "dot-notation": ["error", { "allowKeywords": true }] }
```

> NOTE: this rule is also enforced by Prettier.

#### Example

**Bad**

<!-- prettier-ignore -->
```javascript
something.
  myProperty.
  filter(someCondition).
  map(mapper).
  find(otherCondition)[0].
  someProperty;
```

**Good**

<!-- prettier-ignore -->
```javascript
something
  .myProperty
  .filter(someCondition)
  .map(mapper)
  .find(otherCondition)[0]
  .someProperty;
```

#### ESLint rule

```json
{ "dot-location": ["error", "property"] }
```

> NOTE: this rule is also enforced by Prettier.

### No `else` After `return` in `if`

When an `if` statement has a `return` statement, it is recommended to not have an `else` block as it is redudant. This also enforces the style of programming where you code for the "happy path" by short-circuiting the function on the other paths.

#### Example

**Bad**

```javascript
function example() {
  if (someCondition) {
    return true;
  } else {
    return false;
  }
}
```

**Good**

```javascript
function example() {
  if (weCantDoThis()) {
    return;
  }
  if (!allConditionsMet()) {
    return;
  }
  return happyPath;
}
```

#### ESLint Rule

```json
{ "no-else-return": ["error", { "allowElseIf": false }] }
```

### No Floating Decimal

Float values in JavaScript contain a decimal point, and there is no requirement that the decimal point be preceded or followed by a number. This mechanism is confusing and should not be relied upon.

#### Example

**Bad**

<!-- prettier-ignore -->
```javascript
const num = .5;
const num = 2;
const num = -.7;
```

**Good**

```javascript
const num = 0.5;
const num = 2;
const num = -0.7;
```

#### ESLint Rule

```json
{ "no-floating-decimal": "error" }
```

> NOTE: Prettier also fixes this problem automatically.

### No Extra Space

Multiple spaces in a row that are not used for indentation are typically mistakes. For example:

```javascript
if (foo === "bar") {
}
```

It's hard to tell, but there are two spaces between foo and `===`. Multiple spaces such as this are generally frowned upon in favor of single spaces:

```javascript
if (foo === "bar") {
}
```

#### ESLint Rule

```json
{
  "no-multi-spaces": [
    "error",
    {
      "ignoreEOLComments": false
    }
  ]
}
```

> NOTE: Prettier also handles this case by default.

### No Multiline Strings

It's possible to create multiline strings in JavaScript by using a slash before a newline, such as:

**Bad**

```javascript
let example =
  "Line 1 \
Line 2";
```

Some consider this to be a bad practice as it was an undocumented feature of JavaScript that was only formalized later.

#### ESLint Rule

```json
{ "no-multi-str": "error" }
```

<!-- end Stylistic Best Practices -->

## Control Statements

### Default Case in Switch Statements

We recommend always using a `default` case in `switch` statements, even if to leave a comment, explaining why the default case is not being used. This helps make the code more readable and understandable by your fellow humans. You can also pre-emptively protect the code against future extension by `throw`ing an error in the `default` case or to protect against errors, use the `default` case to provide default arguments even if in the current state of the application it wouldn't make sense to do so.

#### Example

```javascript
switch (name) {
  case "Kenobi:
    console.log("Hey there!");
    break;
  default:
    console.log("Hello");
}
```

#### ESLint rule

> NOTE: with this ESLint rule you can disable the rule by adding a comment before the line that matches the `commentPattern` option.

```json
{ "default-case": ["error", { "commentPattern": "^no default$" }] }
```

### Default Case Goes Last

It is recommended in `switch` statements to put the `default` case last for visual clarity and quick access. You can emphasise cases by placing them further top and therefore the least important case - the `default` case - should be last.

#### ESLint rule

```json
{ "default-case-last": "error" }
```

### No Case Declarations

Declaring variables in a `switch` statement `case` clauses is problematic, because there's an implicit expectation for a clause to behave like a block, but it doesn't and therefore variables "leak" out of the visual scope of these clauses against expectations. A way to remedy this, is to add a block around the clause to make the case block scoped as expected.

#### Example

**Bad**

```javascript
switch (name) {
  case "Kenobi":
    let x = "Hello";
    break;
  default:
    let y = "World";
}
```

**Good**

```javascript
switch (name) {
  case "Kenobi": {
    let x = "Hello";
    break;
  }
  default:
}
```

#### ESLint Rule

```json
{ "no-case-declarations": "error" }
```

### No Fallthrough

The `switch` statement in JavaScript is one of the more error-prone constructs of the language thanks in part to the ability to "fall through" from one case to the next. Therefore it is advised to always use `break` statements to prevent fallthrough behaviour.

#### Example

**Bad**

```javascript
switch (foo) {
  case 1:
    doSomething();

  case 2:
    doSomethingElse();
}
```

**Good**

```javascript
switch (foo) {
  case 1:
    doSomething();
    break;

  case 2:
    doSomethingElse();
}
```

### No Self-Comparison

The only valid use-case of comparing a variable with itself is when trying to determine if a variable is `NaN`. This is because when comparing `NaN` with itself, it returns `false`. Using this comparison might be confusing and therefore it is recommended to use `Number.isNaN()` instead.

#### Example

**Bad**

```javascript
let x = 10;
if (x === x) {
  x = 20;
}
```

**Good**

```javascript
if (Number.isNaN(x)) {
  x = 20;
}
```

#### ESLint Rule

```json
{ "no-self-compare": "error" }
```

### Unused Expressions

It is a popular pattern to make use of expressions to control the flow of an application. This is bad practice as it requires deeper understanding of JavaScript and can therefore lead to bugs by inexperienced developers.

#### Example

**Bad**

```javascript
0;

if (0) 0;

{
  0;
}

f(0), {};

a && b();

a, b();

(c = a), b;
```

**Good**

```javascript
if (a) {
  b();
}

b();

c = a;
```

#### ESLint Rule

```json
{
  "no-unused-expressions": [
    "error",
    {
      "allowShortCircuit": false,
      "allowTernary": false,
      "allowTaggedTemplates": false
    }
  ]
}
```

### No Unused Labels

Labels that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring.

#### Example

**Bad**

```javascript
A: var foo = 0;

B: {
  foo();
}

C: for (let i = 0; i < 10; ++i) {
  foo();
}
```

**Good**

```javascript
A: {
  if (foo()) {
    break A;
  }
  bar();
}

B: for (let i = 0; i < 10; ++i) {
  if (foo()) {
    break B;
  }
  bar();
}
```

#### ESLint Rule

```json
{ "no-unused-labels": "error" }
```

### Yoda Conditions

Yoda conditions are so named because the literal value of the condition comes first while the variable comes second.

#### Example

**Bad**

```javascript
if ("red" === color) {
  // ...
}
```

**Good**

```javascript
if (color === "red") {
  // ...
}
```

#### ESLint Rule

```json
{ "yoda": "error" }
```

<!-- end Control Statements -->

## Iteration

### Guard `for-in` Loops

To iterate over properties of an object, it is possible to use a `for-in` loop. One major problem with this type of loop is that contrary to what you'd expect it does not only iterate over the object's own properties, but also all properties it finds along the prototype chain. This means that when using this type of loop, it is always advised to protect against accessing prototype properties with a `hasOwnProperty` check.

#### Example

**Bad**

```javascript
for (key in foo) {
  doSomething(key); // key can be a property of `foo.prototype`
}
```

**Good**

```javascript
for (key in foo) {
  if (Object.prototype.hasOwnProperty.call(foo, key)) {
    doSomething(key);
  }
}
```

> NOTE: in the majority of use cases `for-in` loops can be avoided altogether in favour of `Object.entries()` iteration or `for-of` loops, both of which do not suffer from the same technical pitfall.

#### ESLint Rule

```json
{ "guard-for-in": "error" }
```

### No Extra Label

If a loop contains no nested loops or switches, labeling the loop is unnecessary.

#### Example

**Bad**

```javascript
C: switch (a) {
  case 0:
    break C;
}
```

**Good**

```javascript
switch (a) {
  case 0:
    break;
}
```

> NOTE: labels being such a rarely used feature in JavaScript, it is generally best to avoid using them altogether, to not risk writing code that is too obscure.

#### ESLint Rule

```json
{ "no-extra-label": "error" }
```

### No `__iterator__`

The `__iterator__` property was a SpiderMonkey extension to JavaScript that could be used to create custom iterators that are compatible with JavaScript's for in and for each constructs. However, this property is now obsolete, so it should not be used.

#### Example

**Bad**

```javascript
foo.__iterator__ = function () {};
```

**Good**

```javascript
foo[Symbol.iterator] = function () {};
```

#### ESLint Rule

```json
{ "no-iterator": "error" }
```

### No Labels

Labels are a rarely used feature of JavaScript and therefore should no be used whenever possible to avoid confusing developers with less experience with them.

#### Example

**Bad**

```javascript
outer: while (true) {
  while (true) {
    break outer;
  }
}
```

**Good**

```javascript
while (true) {
  while (true) {
    break;
  }
}
```

#### ESLint Rule

```json
{ "no-labels": ["error", { "allowLoop": false, "allowSwitch": false }] }
```

### No Function Declaration in Loops

Writing functions within loops tends to result in errors due to the way the function creates a closure around the loop. For example:

```javascript
for (var i = 0; i < 10; i++) {
  funcs[i] = function () {
    return i;
  };
}
```

In this case, you would expect each function created within the loop to return a different number. In reality, each function returns `10`, because that was the last value of `i` in the scope.

`let` or `const` mitigate this problem.

#### ESLint Rule

```json
{ "no-loop-func": "error" }
```

<!-- end Iteration -->

## Inheritance

### No `__proto__`

`__proto__` property has been deprecated as of ECMAScript 3.1 and shouldn't be used in the code. Use `Object.getPrototypeOf` and `Object.setPrototypeOf` instead.

When an object is created with the new operator, `__proto__` is set to the original "prototype" property of the object's constructor function. Object.getPrototypeOf is the preferred method of getting the object's prototype. To change an object's prototype, use `Object.setPrototypeOf`.

#### Example

**Bad**

```javascript
const a = obj.__proto__;
```

**Good**

```javascript
const a = Object.getPrototypeOf(obj);
```

#### ESLint Rule

```json
{ "no-proto": "error" }
```

<!-- end Inheritance -->

## Errors

### No `throw`ing Literal Types

It is considered good practice to only throw the Error object itself or an object using the Error object as base objects for user-defined exceptions. The fundamental benefit of Error objects is that they automatically keep track of where they were built and originated.

#### Example

**Bad**

```javascript
throw "error";

throw 0;

throw undefined;

throw null;
```

**Good**

```javascript
throw new Error();

throw new Error("error");

var e = new Error("error");
throw e;
```

> Another example of a good (yet weird) use case for `throw`ing something other than an error is `React.Suspense` as it handles `Promise`s thrown during renders.

#### ESLint Rule

```json
{ "no-throw-literal": "error" }
```

### Useless `catch` Clauses

A `catch` clause that only rethrows the original error is redundant, and has no effect on the runtime behavior of the program. These redundant clauses can be a source of confusion and code bloat, so it's better to disallow these unnecessary `catch` clauses.

#### Example

**Bad**

```javascript
try {
  doSomethingThatMightThrow();
} catch (e) {
  throw e;
}

try {
  doSomethingThatMightThrow();
} catch (e) {
  throw e;
} finally {
  cleanUp();
}
```

**Good**

```javascript
try {
  doSomethingThatMightThrow();
} catch (e) {
  doSomethingBeforeRethrow();
  throw e;
}

try {
  doSomethingThatMightThrow();
} catch (e) {
  handleError(e);
}

try {
  doSomethingThatMightThrow();
} finally {
  cleanUp();
}
```

#### ESLint Rule

```json
{ "no-useless-catch": "error" }
```

### Throw Async Errors

It is possible to `throw` any value and the same goes for `async` functions, which leads to `reject`ing a `Promise` with the given value. It is best practice to always `throw` and `reject` with an `Error` object.

#### Example

**Bad**

```javascript
async function example() {
  throw "error";
}

new Promise((resolve, reject) => {
  reject("error");
});
```

**Good**

```javascript
async function example() {
  throw new Error("error");
}

new Promise((resolve, reject) => {
  reject(new Error("error"));
});
```

#### ESLint Rule

```json
{ "prefer-promise-reject-errors": ["error", { "allowEmptyReject": false }] }
```

<!-- end Errors -->

## Other Rules

### Triple Equals

JavaScript being the flexible language it is, you can compare two variables with the `==` or `!=` operator, as well as `===` or `!==`. While it may look similar, the two and the three character comparisons are different. The former follows the [Abstract Equality Comparison Algorithm](https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3), which is confusing at best and leads to serious errors when isn't used with care.

A notable exception is comparisons with `null`.

#### Example

**Bad**

```javascript
[] == ![]; // true
[] == false; // true
3 == "03"; // true
```

**Good**

```javascript
[] === ![]; // false
[] === false; // false
3 === "03"; // false
```

**Exceptions**

In some cases it doesn't make a difference whether you use `==` or `===`. While it's still advised to stick with strict equality comparisons. For example, the following statements do not have any special behaviour compared to what you'd expect:

```javascript
"hello" == "hello";
"hello" != "world";
typeof something == "undefined";
something == null; // evaluates to `true` even though `something` is `undefined`
```

**We consider all of the exceptions to be invalid too.**

> NOTE: some style guides encourage the use of `== null` for checking falsy values, but you can also explicitly compare against `undefined` too or use `??`, therefore we recommend always relying on strict equality comparisons.

#### ESLint Rule

```json
{ "eqeqeq": ["error", "always"] }
```

### No Alert, Confirm or Prompt

An artifact of "old JavaScript" a way to gather user input is to show an `confirm` or `prompt` dialog or to `alert` the user. This displays a native dialog element controlled by the browser, which also blocks the JavaScript thread from execution while shown. While [Chrome is slowly deprecating these features](https://developer.chrome.com/blog/deps-rems-91/#remove-alert-confirm-and-prompt-for-cross-origin-iframes), some codebases may still rely on them. While it's sometimes convenient to just use `alert` or `confirm`, it can have adverse effects on user experience as well as unexpected errors, such as dropping of ping-based keep alive mechanisms, such as WebSockets, due to inactivity while the dialog blocks the main thread.

#### ESLint Rule

```json
{ "no-alert": "error" }
```

### No Equals `null`

It is possible to check something is nullish (`null` or `undefined`) with the `== null` technique. This is not recommended, as it requires understanding of the differences between `==` and `===` and their interoperability with `null`.

#### Example

**Bad**

```javascript
const isNotNullish = myVariable != null;
```

**Good**

```javascript
const isNotNullish = myVariable !== undefined && myVariables !== null;

// or

myVariable ?? theValue;
```

#### ESLint Rule

```json
{ "no-eq-null": "error" }
```

### No Restricted Properties

We disallow the use of restricted global properties as they are unsafe to use for various reasons.

#### ESLint Rule

```json
{
  "no-restricted-properties": [
    "error",
    {
      "object": "arguments",
      "property": "callee",
      "message": "arguments.callee is deprecated"
    },
    {
      "object": "global",
      "property": "isFinite",
      "message": "Please use Number.isFinite instead"
    },
    {
      "object": "self",
      "property": "isFinite",
      "message": "Please use Number.isFinite instead"
    },
    {
      "object": "window",
      "property": "isFinite",
      "message": "Please use Number.isFinite instead"
    },
    {
      "object": "global",
      "property": "isNaN",
      "message": "Please use Number.isNaN instead"
    },
    {
      "object": "self",
      "property": "isNaN",
      "message": "Please use Number.isNaN instead"
    },
    {
      "object": "window",
      "property": "isNaN",
      "message": "Please use Number.isNaN instead"
    },
    {
      "property": "__defineGetter__",
      "message": "Please use Object.defineProperty instead."
    },
    {
      "property": "__defineSetter__",
      "message": "Please use Object.defineProperty instead."
    },
    {
      "object": "Math",
      "property": "pow",
      "message": "Use the exponentiation operator (**) instead."
    }
  ]
}
```

<!-- end Other Rules -->
