---
title: ES6+
description: Rules for avoiding unintended side effects and errors in the code, used by engineers at Superbet
tags:
  - tooling
  - errors
  - programming
  - code
  - guidelines
---

# ES6 Rules

Rules that apply to ES6+ environments only.

## Functions

In ES6+ it is possible to define a function as an arrow function.

```javascript
const arrowFunction = () => {};
```

These functions behave differently from regular `functions` in that they "inherit" their scope from the surrounding scope lexically. This means that the value of `this` outside of the arrow function declaration will be the value of `this` inside of the function. This is a great way to avoid the good old practice of `var self = this`.

Consequently, arrow functions cannot be bound with `.call`, `.apply` or `.bind()`. Doing so will not result in an error, however it will also not have any effect on the function.

Arrow functions also do not have access to `arguments` object as it is `undefined` from within the function body.

Syntactically arrow functions are different from regular functions in that they do not have a `function` keyword and their body is optional. They have an implicit return statement if the body is not surrounded by a block.

### Arrow Function Body Style

Arrow function body can be omitted. It is recommended to use the omitted body style when the function body is a single expression, with the exception of returning an object, in which case it is recommended to always include the body to avoid confusion.

For example, one might think the the following function returns an object with a `name` property with the value: `"Daniel"`.

<!-- prettier-ignore -->
```javascript
const example = () => {
  name: "Daniel"
};
```

> NOTE: Prettier adds `;` to the end of the label in the body, which identifies it as such and makes it a little easier to identify this problem.

This is a common mistake, because in this situation, you're just defining a `void` function that has a label in its body.

#### Example

**Bad**

```javascript
let foo = () => ({});
let foo = () => ({ bar: 0 });
let foo = () => {
  return 1;
};
```

**Good**

```javascript
let foo = () => {
  return {};
};
let foo = () => {
  return { bar: 0 };
};
let foo = () => 1;
```

#### ESLint Rule

```json
{
  "arrow-body-style": [
    "error",
    "as-needed",
    {
      "requireReturnForObjectLiteral": true
    }
  ]
}
```

### Arrow Function Parenthesis

The parenthesis around function parameters are optional. It is recommended not to use this style, however, because

1. It might be confusing for those who do not know of this syntax.
2. It introduces additional changes required to add extra properties.

#### Example

**Bad**

<!-- prettier-ignore -->
```javascript
const example = a => {
  doSomethingWith(a);
};
const lazyExample = _ => 42;
```

**Good**

```javascript
const example = (a) => {
  doSomethingWith(a);
};
const lazyExample = () => 42;
```

#### ESLint Rule

```json
{ "arrow-parens": ["error", "always"] }
```

### Arrow Function Spacing

It is recommended to surround the arrow (`=>`) in an arrow function with spaces.

#### Example

**Bad**

<!-- prettier-ignore -->
```javascript
()=>{};
() =>{};
()=> {}
```

**Good**

```javascript
() => {};
```

#### ESLint Rule

```json
{ "arrow-spacing": ["error", { "before": true, "after": true }] }
```

### Generator Star Spacing

Generators are a new type of function in ECMAScript 6 that can return multiple values over time. These special functions are indicated by placing an `*` after the `function` keyword.

#### Example

**Bad**

<!-- prettier-ignore -->
```javascript
function * generator() {
  yield 1;
  yield 2;
}
function *generator() {
  yield 1;
  yield 2;
}
```

**Good**

```javascript
function* generator() {
  yield 1;
  yield 2;
}
```

> NOTE: Prettier also enforces this rule.

#### ESLint Rule

```json
{ "generator-star-spacing": ["error", { "before": false, "after": true }] }
```

### Arrow Function Confusion with Comparisons

Arrow functions (`=>`) are similar in syntax to some comparison operators (`>`, `<`, `<=`, and `>=`). To make code clearly readable, it is recommended to use measures to clarify your code.

#### Example

**Bad**

<!-- prettier-ignore -->
```javascript
let x = (a) => 1 ? 2 : 3;
```

**Good**

```javascript
let x = (a) => (1 ? 2 : 3);
let x = (a) => {
  return 1 ? 2 : 3;
};
```

> NOTE: Prettier also enforces this rule.

#### ESLint Rule

```json
{
  "no-confusing-arrow": [
    "error",
    {
      "allowParens": true
    }
  ]
}
```

### Arrow Functions as Callbacks

Arrow functions can be an attractive alternative to function expressions for callbacks or function arguments.

For example, arrow functions are automatically bound to their surrounding scope/context. This provides an alternative to the pre-ES6 standard of explicitly binding function expressions to achieve similar behavior.

Additionally, arrow functions are:

- less verbose, and easier to reason about.
- bound lexically regardless of where or when they are invoked.

#### Example

**Bad**

```javascript
document.addEventListener("click", function () {
  console.log("Clicked!");
});
```

**Good**

```javascript
document.addEventListener("click", () => {
  console.log("Clicked!");
});
```

#### ESLint Rule

```json
{
  "prefer-arrow-callback": [
    "error",
    {
      "allowNamedFunctions": false,
      "allowUnboundThis": true
    }
  ]
}
```

### Rest Parameters in Variadic Functions

ES6 introduced the `...` syntax to allow functions to accept a variable number of arguments. Previously you could access the `arguments` object to get all of the arguments passed to the function, however `arguments` doesn't inherit from `Array`, which makes it inconvenient to use in some cases. `arguments` is also not available in arrow functions.

#### Example

**Bad**

```javascript
function foo() {
  console.log(arguments);
}

function foo(action) {
  var args = Array.prototype.slice.call(arguments, 1);
  action.apply(null, args);
}

function foo(action) {
  var args = [].slice.call(arguments, 1);
  action.apply(null, args);
}
```

**Good**

```javascript
function foo(...args) {
  console.log(args);
}

function foo(action, ...args) {
  action.apply(null, args); // or `action(...args)`, related to the `prefer-spread` rule.
}

// Note: the implicit arguments can be overwritten.
function foo(arguments) {
  console.log(arguments); // This is the first argument.
}
function foo() {
  var arguments = 0;
  console.log(arguments); // This is a local variable.
}
```

#### ESLint Rule

```json
{ "prefer-rest-params": "error" }
```

### Generator Functions Without `yield`

Generator functions that do not have the `yield` keyword are most likely a product of refactoring whereby the iterator feature of the generator was removed, yet the function was not converted to a regular function.

#### Example

**Bad**

```javascript
function* foo() {
  return 10;
}
```

**Good**

```javascript
function* foo() {
  yield 5;
  return 10;
}

function foo() {
  return 10;
}

// NOTE: empty generator functions are allowed, but are also discouraged by another rule
function* foo() {}
```

#### ESLint Rule

```json
{ "require-yield": "error" }
```

<!-- end Functions -->

## Classes

### Calling `super()` in a Constructor

Constructors of derived classes must call `super()`. Constructors of non derived classes must not call `super()`. If this is not observed, the JavaScript engine will raise a runtime error.

This rule checks whether or not there is a valid `super()` call.

#### Example

**Bad**

```javascript
class A {
  constructor() {
    super(); // This is a SyntaxError.
  }
}

class A extends B {
  constructor() {} // Would throw a ReferenceError.
}

// Classes which inherits from a non constructor are always problems.
class A extends null {
  constructor() {
    super(); // Would throw a TypeError.
  }
}

class A extends null {
  constructor() {} // Would throw a ReferenceError.
}
```

**Good**

```javascript
class A {
  constructor() {}
}

class A extends B {
  constructor() {
    super();
  }
}
```

#### ESLint Rule

```json
{ "constructor-super": "error" }
```

### Modification of Class Declarations

`ClassDeclaration` creates a variable, and we can modify the variable.

#### Example

**Bad**

```javascript
class A {}
A = 0;
```

**Good**

```javascript
class A {}
const a = 0;
```

#### ESLint Rule

```json
{ "no-class-assign": "error" }
```

### Duplicate Class Members

If there are declarations of the same name in class members, the last declaration overwrites other declarations silently. It can cause unexpected behaviors.

#### Example

**Bad**

```javascript
class Foo {
  bar() {}
  bar() {}
}

class Foo {
  bar() {}
  get bar() {}
}
```

**Good**

```javascript
class Foo {
  bar() {}
  qux() {}
}

class Foo {
  get bar() {}
  set bar(value) {}
}
```

#### ESLint Rule

```json
{ "no-dupe-class-members": "error" }
```

### Using `this`/`super` in a Constructor Before Calling `super()`

In the constructor of derived classes, if `this`/`super` are used before `super()` calls, it raises a reference error.

#### Example

**Bad**

```javascript
class A extends B {
  constructor() {
    this.a = 0;
    super();
  }
}
```

**Good**

```javascript
class A extends B {
  constructor() {
    super();
    this.a = 0;
  }
}
```

#### ESLint Rule

```json
{ "no-this-before-super": "error" }
```

### Unnecessary Constructor

ES2015 provides a default class constructor if one is not specified. As such, it is unnecessary to provide an empty constructor or one that simply delegates into its parent class.

#### Example

**Bad**

```javascript
class A {
  constructor() {}
}

class B extends A {
  constructor(...args) {
    super(...args);
  }
}
```

**Good**

```javascript
class A {}

class A {
  constructor() {
    doSomething();
  }
}

class B extends A {}

class B extends A {
  constructor() {
    super("foo");
  }
}
```

#### ESLint Rule

```json
{ "no-useless-constructor": "error" }
```

<!-- end Classes -->

## Variables

### `const` Reassignment

We cannot modify variables that are declared using `const` keyword. It will raise a runtime error.

Under non ES2015 environment, it might be ignored merely.

#### Example

**Bad**

```javascript
const a = 0;
a = 1;
a += 1;
```

#### ESLint Rule

```json
{ "no-const-assign": "error" }
```

### `const` and `let`

ECMAScript 6 allows programmers to create variables with block scope instead of function scope using the let and const keywords. Block scope is common in many other programming languages and helps programmers avoid mistakes.

#### Example

**Bad**

```javascript
var x = "y";
var CONFIG = {};
```

**Good**

```javascript
let x = "y";
const CONFIG = {};
```

#### ESLint Rule

```json
{ "no-var": "error" }
```

### Prefer `const`

If a variable is never reassigned, using the `const` declaration is better.

`const` declaration tells readers, "this variable is never reassigned," reducing cognitive load and improving maintainability.

The argument against `let` being 3 characters and therefore save time to type, is, ideally tooling will turn `let` into const when you save / commit a file, so you can still keep using it and let the tooling take care of changing it.

#### Example

**Bad**

```javascript
let a = 3;
console.log(a);
```

**Good**

```javascript
const a = 3;
console.log(a);

let b = 3;
b += 1;
```

#### ESLint Rule

```json
{
  "prefer-const": [
    "error",
    {
      "destructuring": "any",
      "ignoreReadBeforeAssign": true
    }
  ]
}
```

### Destructuring Assignment

With JavaScript ES6, a new syntax was added for creating variables from an array index or object property, called destructuring. We recommend using destructuring instead of accessing a property through a member expression.

#### Example

**Bad**

```javascript
const someValue = myObj.someValue;
const someOtherValue = myObj["someOtherValue"];
```

**Good**

```javascript
const { someValue } = myObj;
const { someOtherValue } = myObj;
```

#### ESLint Rule

```json
{
  "prefer-destructuring": [
    "error",
    {
      "VariableDeclarator": {
        "array": false,
        "object": true
      },
      "AssignmentExpression": {
        "array": true,
        "object": false
      }
    },
    {
      "enforceForRenamedProperties": false
    }
  ]
}
```

<!-- end Variables -->

## Globals

### Using `Symbol` as a Constructor

`Symbol` is not intended to be used with the `new` operator, but to be called as a function.

#### Example

**Bad**

```javascript
const symbol = new Symbol("foo");
```

**Good**

```javascript
const symbol = Symbol("foo");
```

#### ESLint Rule

```json
{ "no-new-symbol": "error" }
```

### Spread Operator Instead of `Function.prototype.apply`

In ES6 it is possible to "apply" an array of arguments to a variadic function, by using the `...` spread operator. This is recommended over `Function.prototype.apply` because it is terser.

#### Example

**Bad**

```javascript
const numbers = [1, 2, 1, 5, 3];
Math.max.apply(Math, numbers);
```

**Good**

```javascript
const numbers = [1, 2, 1, 5, 3];
Math.max(...numbers);
```

#### ESLint Rule

```json
{ "prefer-spread": "error" }
```

### Symbol Descriptions

The `Symbol` function accepts an optional `description` argument, which is a string that describes the symbol for debugging purposes. It is recommended to always provide a description for symbols as it is a way for the code to document itself and help debugging.

#### Example

**Bad**

```javascript
const mySymbol = Symbol();
```

**Good**

```javascript
const mySymbol = Symbol("my symbol");
```

#### ESLint Rule

```json
{ "symbol-description": "error" }
```

<!-- end Globals -->

## Modules

In a project, certain names may be disallowed from being used as exported names for various reasons.

Using `default` as a named export is not allowed. Just use a `default` export instead. Exporting a variable named `then` is not allowed. It mat break dynamic imports, but is confusing at the very least.

#### Example

**Bad**

```javascript
export const default = () => 42;
export const then = "then";
```

**Good**

```javascript
export default function defaultFunction() {
  return 42;
}
```

#### ESLint Rule

```json
{
  "no-restricted-exports": [
    "error",
    {
      "restrictedNamedExports": ["default", "then"]
    }
  ]
}
```

### Renaming Imports to the Same Name

It is possible to rename imports and destructured assignments to the same name as they originally were. This is a noop, but can be caused by mass renaming a variable that was already renamed as an import or destructured assignment and the renaming changed it to the original name.

#### Example

**Bad**

```javascript
import { foo as foo } from "bar";
export { foo as foo };
let { foo: foo } = bar;
```

**Good**

```javascript
import { foo } from "bar";
export { foo };
let { foo } = bar;
```

#### ESLint Rule

```json
{
  "no-useless-rename": [
    "error",
    {
      "ignoreDestructuring": false,
      "ignoreImport": false,
      "ignoreExport": false
    }
  ]
}
```

<!-- end Modules -->

## Promises

### Unnecessary `await` in `return`

It is unnecessary to use `await` in `return` statements as an `async function` always returns a promise.

#### Example

**Bad**

```javascript
async function foo() {
  return await bar();
}
```

**Good**

```javascript
async function foo() {
  return bar();
}
```

#### ESLint Rule

```json
{ "no-return-await": "error" }
```

<!-- end Promises -->

## Properties

### Unsafe Optional Chaining

The optional chaining (`?.`) expression can short-circuit with a return value of `undefined`. Therefore, treating an evaluated optional chaining expression as a function, object, number, etc., can cause `TypeError` or unexpected results.

#### Example

**Bad**

```javascript
const obj = undefined;

1 in obj?.foo; // TypeError
with (obj?.foo); // TypeError
for (bar of obj?.foo); // TypeError
bar instanceof obj?.foo; // TypeError
const { bar } = obj?.foo; // TypeError
```

**Good**

```javascript
const obj = undefined;

(obj?.foo)(); // TypeError
(obj?.foo).bar; // TypeError
```

#### ESLint Rule

```json
{
  "no-unsafe-optional-chaining": [
    "error",
    { "disallowArithmeticOperators": true }
  ]
}
```

### Unnecessary Dynamic Properties

It's unnecessary to use computed properties with literals. It's usually a sign of an unfinished refactoring.

#### Example

**Bad**

```javascript
const a = { ["0"]: 0 };
const a = { ["0+1,234"]: 0 };
const a = { [0]: 0 };
const a = { ["x"]: 0 };
const a = { ["x"]() {} };
```

**Good**

```javascript
const a = { 0: 0 };
const a = { "0+1,234": 0 };
const a = { x: 0 };
const a = { x() {} };
```

#### ESLint Rule

```json
{ "no-useless-computed-key": "error" }
```

### Object Property Shorthand

ECMAScript 6 provides a concise form for defining object literal methods and properties. This syntax can make defining complex object literals much cleaner.

#### Example

**Bad**

```javascript
var foo = {
  x: x,
  y: y,
  z: z,
};

// methods
var foo = {
  a: function () {},
  b: function () {},
};
```

**Good**

```javascript
const foo = { x, y, z };

// methods
const foo = {
  a() {},
  b() {},
};
```

#### ESLint Rule

```json
{
  "object-shorthand": [
    "error",
    "always",
    {
      "ignoreConstructors": false,
      "avoidQuotes": true
    }
  ]
}
```

<!-- end Properties -->

## Primitives

### Numeric Literals

The `parseInt()` and `Number.parseInt()` functions can be used to turn binary, octal, and hexadecimal strings into integers. As binary, octal, and hexadecimal literals are supported in ES6, it is recommended to use of those numeric literals instead of `parseInt()` or `Number.parseInt()`.

#### Example

**Bad**

```javascript
parseInt("111110111", 2) === 503;
parseInt(`111110111`, 2) === 503;
parseInt("767", 8) === 503;
parseInt("1F7", 16) === 503;
Number.parseInt("111110111", 2) === 503;
Number.parseInt("767", 8) === 503;
Number.parseInt("1F7", 16) === 503;
```

**Good**

```javascript
parseInt(1);
parseInt(1, 3);
Number.parseInt(1);
Number.parseInt(1, 3);

0b111110111 === 503;
0o767 === 503;
0x1f7 === 503;

a[parseInt](1, 2);

parseInt(foo);
parseInt(foo, 2);
Number.parseInt(foo);
Number.parseInt(foo, 2);
```

#### ESLint Rule

```json
{ "prefer-numeric-literals": "error" }
```

### Template Strings for Concatenation

In ES2015 (ES6), we can use template literals instead of string concatenation. This method is preferred over `+` concatenation because it is more readable and easier to type.

#### Example

**Bad**

```javascript
const str = "Hello, " + name + "!";
const str = "Time: " + 12 * 60 * 60 * 1000;
```

**Good**

```javascript
const str = `Hello, ${name}!`;
const str = `Time: ${12 * 60 * 60 * 1000}`;
```

#### ESLint Rule

```json
{ "prefer-template": "error" }
```

<!-- end Primitives -->

## Stylistic Recommendations

### Spacing in Rest-Spread

ES2015 introduced the rest and spread operators, which expand an iterable structure into its individual parts. The spec allows for spaces around the `...` and the value it is applied to. Adding this spacing is not recommended because it decreases readability as the operator and the value technically belong together to form the expression.

#### Example

**Bad**

<!-- prettier-ignore -->
```javascript
fn(... args)
[... arr, 4, 5, 6]
let [a, b, ... arr] = [1, 2, 3, 4, 5];
function fn(... args) { console.log(args); }
let { x, y, ... z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ... z };
```

**Good**

```javascript
fn(...args)
[...arr, 4, 5, 6]
let [a, b, ...arr] = [1, 2, 3, 4, 5];
function fn(...args) { console.log(args); }
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ...z };
```

#### ESLint Rule

```json
{ "rest-spread-spacing": ["error", "never"] }
```

### Spacing in Template Strings

We can embed expressions in template strings with using a pair of `${` and `}`.

It is possible to add any amount of spacing within the brackets, however it is recommended to not use any spacing between the `${` and the expression or between the expression and the `}`.

It is encouraged to split the expression into multiple lines should it be required to increase readability, however.

#### Example

**Bad**

<!-- prettier-ignore -->
```javascript
const time = `The time is ${ new Date().toLocaleTimeString()}`;
const introduction = `My name is ${ name }`;
const greeting = `Hey there ${name }`;
```

**Good**

```javascript
const time = `The time is ${new Date().toLocaleTimeString()}`;
const introduction = `My name is ${name}`;
const greeting = `Hey there ${name}`;
```

> NOTE: This is also enforced by Prettier.

#### ESLint Rule

```json
{ "template-curly-spacing": "error" }
```

### `yield*` Spacing

It is possible to add arbitrary spacing around the `*` in `yield*`. It is recommended for consistency to add the spacing after the `*`. This is in line with the idea that the keyword is "yield star" as opposed to "yield" and the function gets the "star".

#### Example

**Bad**

<!-- prettier-ignore -->
```javascript
function* example() {
  yield * otherGenerator();
  yield *anotherGenerator();
}
```

**Good**

```javascript
function* example() {
  yield* otherGenerator();
  yield* anotherGenerator();
}
```

> NOTE: this is also enforced by Prettier.

#### ESLint Rule

```json
{ "yield-star-spacing": ["error", "after"] }
```

<!-- end Stylistic Recommendations -->
