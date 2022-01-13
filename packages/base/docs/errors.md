---
title: Errors
description: Rules for avoiding unintended side effects and errors in the code, used by engineers at Superbet
tags:
  - tooling
  - errors
  - programming
  - code
  - guidelines
---

# Errors

Rules for avoiding unintended side effects and errors in the code.

## Iteration

### Avoid Inifite Loops

A `for` loop with a stop condition that can never be reached, such as one with a counter that moves in the wrong direction, will run infinitely. While there are occasions when an infinite loop is intended, the convention is to construct such loops as `while` loops. More typically, an infinite `for` loop is a bug.

#### Example

**Bad**

```javascript
for (let i = 0; i < 10; i--) {}
```

**Good**

```javascript
for (let i = 0; i < 10; i++) {}
```

#### ESLint Rule

```json
{ "for-direction": "error" }
```

### One Iteration Loop

You can `break` early from a loop after one iteration, making the loop completely useless. Often times this is done by mistake, e.g.: forgetting to move the `break` statement inside an `if` statement block.

#### Example

**Bad**

```javascript
while (foo) {
  doSomething(foo);
  foo = foo.parent;
  break;
}
```

**Good**

```javascript
while (foo) {
  doSomething(foo);
  foo = foo.parent;
  if (somethingDone()) {
    break;
  }
}
```

#### ESLint Rule

```json
{
  "no-unreachable-loop": [
    "error",
    {
      "ignore": []
    }
  ]
}
```

<!-- end Iteration -->

## Properties

### `return` in Getters

It is recommended to always return a value from a getter. When no value is `return`ed, the getter will return `undefined`, which is usually an indication that `get` was misused.

#### Example

**Bad**

```javascript
const example = {
  get foo() {
    console.log("getting foo");
  },
};
```

**Good**

```javascript
const example = {
  get foo() {
    console.log("getting foo");
    return "foo";
  },
};
```

#### ESLint Rule

```json
{ "getter-return": ["error", { "allowImplicit": true }] }
```

### Duplicate Keys

Multiple properties with the same key in object literals can cause unexpected behavior in your application. Having multiple properties with the same key is most likely a developer mistake. And causes the last value to be defined to be used.

#### Example

**Bad**

```javascript
const myObject = {
  foo: "bar",
  foo: "baz",
};
```

**Good**

```javascript
const myObject = {
  foo: "bar",
  bar: "baz",
};
```

#### ESLint Rule

```json
{ "no-dupe-keys": "error" }
```

### Assigning to `import`ed Values

The updates of imported bindings by ES Modules cause runtime errors in an ES6+ environment. This is because native ES Modules are read-only.

#### Example

**Bad**

```javascript
import mod, { named } from "./mod.mjs";
import * as mod_ns from "./mod.mjs";

mod = 1; // ERROR: 'mod' is readonly.
named = 2; // ERROR: 'named' is readonly.
mod_ns.named = 3; // ERROR: The members of 'mod_ns' are readonly.
mod_ns = {}; // ERROR: 'mod_ns' is readonly.
// Can't extend 'mod_ns'
Object.assign(mod_ns, { foo: "foo" }); // ERROR: The members of 'mod_ns' are readonly.
```

**Good**

```javascript
import mod, { named } from "./mod.mjs";
import * as mod_ns from "./mod.mjs";

mod.prop = 1;
named.prop = 2;
mod_ns.named.prop = 3;
```

#### ESLint Rule

```json
{ "no-import-assign": "error" }
```

### No Return in Setters

It is not recommended to use `get`ters and `set`ters to control properties. Instead use the property directly. However it is also not recommended to return a value from a `set`ter. The value returned is being ignored, so it is likely a mistake.

#### Example

**Bad**

```javascript
const foo = {
  set a(value) {
    this.val = value;
    return value;
  },
};
```

**Good**

```javascript
const foo = {
  set a(value) {
    this.val = value;
  },
};
```

#### ESLint Rule

```json
{ "no-setter-return": "error" }
```

<!-- end Properties -->

## Promises

### `async` Promise Executor

The `executor` is the first argument of a `Promise` constructor. The `executor` is called with two arguments: `resolve` and `reject`. It is possible to make the `executor` an `async` function, however this is most likely a mistake. This approach can cause bugs by swallowing errors mistakenly.

#### Example

**Bad**

```javascript
const result = new Promise(async (resolve, reject) => {
  resolve(await foo);
});
```

**Good**

```javascript
const result = new Promise.resolve(foo);
```

#### ESLint Rule

```json
{ "no-async-promise-executor": "error" }
```

### `await` in `for` Loops

It is technically possible to use `await` in a `for` loop, but it is not recommended. This causes the execution context to pause until each promise is resolved, one by one, causing sequential behaviour, where parallel behaviour is almost always valid and more desired.

#### Example

**Bad**

```javascript
const example = async () => {
  for (let index = 0; index < 10; index++) {
    await fetchItemById(index);
  }
};
```

**Good**

```javascript
const example = async () => {
  let promises = [];
  for (let index = 0; index < 10; index++) {
    promises.push(fetchItemById(index));
  }
  await Promise.all(promises);
};
```

#### ESLint Rule

```json
{ "no-await-in-loop": "error" }
```

### `return` from `Promise` Executor

A quite common mistake from beginners is to expect the `executor` parameter of a `Promise` constructor to have to return a value. The return value of the `executor` is ignored and therefore it should not be used.

#### Example

**Bad**

```javascript
new Promise((resolve, reject) => {
  if (condition) {
    return defaultValue;
  }
  someOperation.then(resolve).catch(reject);
});
```

**Good**

```javascript
new Promise((resolve, reject) => {
  if (condition) {
    resolve(defaultValue);
    return;
  }
  someOperation.then(resolve).catch(reject);
});
```

#### ESLint Rule

```json
{ "no-promise-executor-return": "error" }
```

<!-- end Promises -->

## Conditions

### Comparison with `-0`

In JavaScript there are two different zeroes. `0` or `+0` and `-0`. They are not equal to each other, however comparison via `-0 === 0` gives a false positive. To get around this, the solution is to use `Object.is()` to compare numbers numbers that can possibly be `-0`.

#### Example

**Bad**

```javascript
if (myNum === -0) {
  // `myNum` can also be 0
}
```

**Good**

```javascript
if (Object.is(myNum, -0)) {
  // `myNum` can also only be -0
}
```

#### ESLint Rule

```json
{ "no-compare-neg-zero": "error" }
```

### Conditional Assignment

It is a common mistake to use an assignment in a condition instead of a comparison. This can cause bugs by accidentally overwriting variables and evaluating to the wrong boolean value.

#### Example

**Bad**

```javascript
if ((myValue = 1)) {
  // This will always evaluate to `true`
}
```

**Good**

```javascript
if (myValue === 1) {
  // This will always evaluate to `true`
}
```

#### ESLint Rule

```json
{ "no-cond-assign": ["error", "always"] }
```

### No Constant Conditions

Constant conditions are very likely due to developer error, such as a typo or a leftover `if (true) {}` statement used for debugging.

#### Example

**Bad**

```javascript
if (false) {
  doSomethingUnfinished();
}

if (void x) {
  doSomethingUnfinished();
}

if ((x &&= false)) {
  doSomethingNever();
}

if (class {}) {
  doSomethingAlways();
}

if (new Boolean(x)) {
  doSomethingAlways();
}

if ((x ||= true)) {
  doSomethingAlways();
}

for (; -2; ) {
  doSomethingForever();
}

while (typeof x) {
  doSomethingForever();
}

do {
  doSomethingForever();
} while ((x = -1));

const result = 0 ? a : b;
```

**Good**

```javascript
if (x === 0) {
  doSomething();
}

for (;;) {
  doSomethingForever();
}

while (typeof x === "undefined") {
  doSomething();
}

do {
  doSomething();
} while (x);

const result = x !== 0 ? a : b;
```

#### ESLint Rule

```json
{ "no-constant-condition": "warn" }
```

### No Duplicate `else if` Conditions

It is possible to provide the same condition in an `else if` chain, however this is most likely a mistake.

#### Example

**Bad**

```javascript
if (isSomething(x)) {
  foo();
} else if (isSomething(x)) {
  bar();
}
```

**Good**

```javascript
if (isSomething(x)) {
  foo();
} else if (isSomethingElse(x)) {
  bar();
}
```

#### ESLint Rule

```json
{ "no-dupe-else-if": "error" }
```

### Duplicate `case` Statements

When there's two `case` statements for the same value, it is likely a mistake, caused by the `case` having been copied over but the condition not being updated. This can cause bugs by accidentally overwriting variables and cause unintended side effects.

#### Example

**Bad**

```javascript
switch (a) {
  case 1:
    break;
  case 2:
    break;
  case 1: // duplicate test expression
    break;
  default:
    break;
}
```

**Good**

```javascript
switch (a) {
  case 1:
    break;
  case 2:
    break;
  case 3:
    break;
  default:
    break;
}
```

#### ESLint Rule

```json
{ "no-duplicate-case": "error" }
```

### No Empty Blocks

Although this doesn't just relate to conditions and control statements, having an empty block is usually the indication of unfinished work, e.g.: unhandled exceptions, unfinished promises, etc.

#### Example

**Bad**

```javascript
if (foo) {
}

while (foo) {}

switch (foo) {
}

try {
  doSomething();
} catch (ex) {
} finally {
}
```

**Good**

```javascript
try {
  doSomething();
} catch (error) {
  handleError(error);
}
```

#### ESLint Rule

```json
{ "no-empty": "error" }
```

### Extra Boolean Cast

It is possible to cast a value to a `boolean` by preceding it with a `!!` or `!` if you want to negate it. You can also construct a boolean value by using the `Boolean()` constructor. In some cases, like in `if` statement conditions this is not necessary as they value will already be implicitly cast to a boolean by default.

#### Example

**Bad**

```javascript
do {
  // ...
} while (Boolean(foo));

for (; !!foo; ) {
  // ...
}
```

**Good**

```javascript
do {
  // ...
} while (foo);

for (; foo; ) {
  // ...
}
```

#### ESLint Rule

```json
{ "no-extra-boolean-cast": "error" }
```

### Unsafe Negation

It is common to use `!` to negate the outcome of an expression, however the `instanceof` and `in` operators come with special syntax that make this a source of confusion and errors.

E.g.: consider the following example:

```javascript
if (!"filter" in []) {
  // polyfill .filter
}
```

You might be surprised to find that our polyfill will never be used, because what we're doing is actually this:

```javascript
const keyToCheck = !"filter"; // false
//  (false in []) -> false
if (keyToCheck in []) {
  // polyfill .filter
}
```

To avoid this confusion, it is recommended to wrap use the `instanceof` and `in` operators when negating the results.

#### Example

**Bad**

```javascript
if (!key in object) {
  // ...
}
```

**Good**

```javascript
if (!(key in object)) {
  // ...
}
```

#### ESLint Rule

```json
{ "no-unsafe-negation": "error" }
```

<!-- end Conditions -->

## Globals

### Logging

The simplest way to display a message as an output of a JavaScript program is to use the `console.log()` function. The limitation of `console` methods is that they are not configurable and cannot be switched on and off, e.g.: in a production environment.

The best way to manage log output while keeping the codebase maintainable is to use a logging library.

#### Example

**Bad**

```javascript
console.error(`Something went wrong, ${error}`);
```

**Good**

```javascript
import logger from "my-logger";

logger.error(`Something went wrong, ${error}`);
```

#### ESLint Rule

```json
{ "no-console": "error" }
```

### No `debugger`

The `debugger` keyword is a very powerful tool that allows you to pause the execution of a program at any point. It is not recommended to use it in production, because even though it should only block the thread when the debugger is attached, such as when the Chrome Developer Tools are open. This behaviour is not guaranteed in all browsers, so using `debugger` in production code presents an unnecessary risk.

#### Example

**Bad**

```javascript
function isTruthy(x) {
  debugger;
  return Boolean(x);
}
```

**Good**

```javascript
function isTruthy(x) {
  // set a breakpoint at this line
  return Boolean(x);
}
```

#### ESLint Rule

```json
{ "no-debugger": "error" }
```

### Calling of Global Objects as Functions

Some global objects (e.g.: `Math`) have a capitalisation, which would suggest that they're available as constructors, but they are just used as namespaces with static methods and properties. Calling these as functions (or constructors) is a mistake and should be avoided.

#### Example

**Bad**

```javascript
const math = Math();
const newMath = new Math();
const json = JSON();
const newJSON = new JSON();
const reflect = Reflect();
const newReflect = new Reflect();
const atomics = Atomics();
const newAtomics = new Atomics();
```

**Good**

```javascript
function area(r) {
  return Math.PI * r * r;
}
const object = JSON.parse("{}");
const value = Reflect.get({ x: 1, y: 2 }, "x");
const first = Atomics.load(foo, 0);
```

#### ESLint Rule

```json
{ "no-obj-calls": "error" }
```

### Direct Calls of Prototype Built-in Methods

A common mistake that causes runtime errors is the assumption that some argument or value has a specific prototype, e.g.: `Object` or `String`. It is possible to use `Object.create(null)` to construct plain objects that do not inherit from `Object`. Similarly we can expect some variable to be a `String` when in fact it is a `Number`, which means that calling a `String` prototype built-in on it will cause a runtime error. To avoid this, it is recommended to use the prototype method explicitly and `bind` it to the value instead.

#### Example

**Bad**

```javascript
const hasBarProperty = foo.hasOwnProperty("bar");
const barIsEnumerable = foo.propertyIsEnumerable("bar");
```

**Good**

```javascript
const hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar");
const barIsEnumerable = {}.propertyIsEnumerable.call(foo, "bar");
```

#### ESLint Rule

```json
{ "no-prototype-builtins": "error" }
```

<!-- end Globals -->

## Regular Expressions

### No Control Characters in Regular Expressions

Control characters are special, invisible characters in the ASCII range 0-31. These characters are rarely used in JavaScript strings so a regular expression containing these characters is most likely a mistake.

#### Example

**Bad**

```javascript
const pattern1 = /\x1f/;
const pattern2 = new RegExp("\x1f");
```

**Good**

```javascript
const pattern1 = /\x20/;
const pattern2 = new RegExp("\x20");
```

#### ESLint Rule

```json
{ "no-control-regex": "error" }
```

### No Empty Character Class

Character classes in regular expressions are created via `[]`. Leaving the class empty does not do anything so it is most likely done by mistake.

#### Example

**Bad**

```javascript
const hasStringArray = /^string[]/.test("string[]"); // false
```

**Good**

```javascript
const hasStringArray = /^string\[\]/.test("string[]"); // true
```

#### ESLint Rule

```json
{ "no-empty-character-class": "error" }
```

### Invalid Regular Expression

An invalid pattern in a regular expression literal is a `SyntaxError` when the code is parsed, but an invalid string in `RegExp` constructors throws a `SyntaxError` only when the code is executed. It is advised to avoid making errors in regular expressions.

#### Example

**Bad**

```javascript
RegExp(".", "z");

new RegExp("\\");
```

**Good**

```javascript
RegExp(".");

new RegExp();
```

#### ESLint Rule

```json
{ "no-invalid-regexp": "error" }
```

### Multiple Code Point Characters in Regular Expressions

Unicode includes the characters which are made with multiple code points. RegExp character class syntax (`/[abc]/`) cannot handle characters which are made by multiple code points as a character; those characters will be dissolved to each code point. For example, `❇️` is made by `❇` (`U+2747`) and VARIATION SELECTOR-16 (`U+FE0F`). If this character is in RegExp character class, it will match to either `❇` (`U+2747`) or VARIATION SELECTOR-16 (`U+FE0F`) rather than `❇️`.

#### Example

**Bad**

```javascript
/^[Á]$/u
/^[❇️]$/u
/^[👶🏻]$/u
/^[🇯🇵]$/u
/^[👨‍👩‍👦]$/u
/^[👍]$/
```

**Good**

```javascript
/^[abc]$/
/^[👍]$/u
```

#### ESLint Rule

```json
{ "no-misleading-character-class": "error" }
```

### Multiple Spaces Inside Regular Expressions

Regular expressions can be very complex and difficult to understand, which is why it's important to keep them as simple as possible in order to avoid mistakes. One of the more error-prone things you can do with a regular expression is to use more than one space.

#### Example

**Bad**

```javascript
const re = /foo   bar/;
const re = new RegExp("foo   bar");
```

**Good**

```javascript
const re = /foo {3}bar/;
const re = new RegExp("foo {3}bar");
```

#### ESLint Rule

```json
{ "no-regex-spaces": "error" }
```

### Useless Back Reference

In JavaScript regular expressions, it's syntactically valid to define a backreference to a group that belongs to another alternative part of the pattern, a backreference to a group that appears after the backreference, a backreference to a group that contains that backreference, or a backreference to a group that is inside a negative lookaround. However, by the specification, in any of these cases the backreference always ends up matching only zero-length (the empty string), regardless of the context in which the backreference and the group appear.

Backreferences that always successfully match zero-length and cannot match anything else are useless. They are basically ignored and can be removed without changing the behavior of the regular expression.

#### Example

**Bad**

```javascript
/^(?:(a)|\1b)$/; // reference to (a) into another alternative

/^(?:(a)|b(?:c|\1))$/; // reference to (a) into another alternative

/^(?:a|b(?:(c)|\1))$/; // reference to (c) into another alternative

/\1(a)/; // forward reference to (a)

RegExp("(a)\\2(b)"); // forward reference to (b)

/(?:a)(b)\2(c)/; // forward reference to (c)

/\k<foo>(?<foo>a)/; // forward reference to (?<foo>a)

/(?<=(a)\1)b/; // backward reference to (a) from within the same lookbehind

/(?<!(a)\1)b/; // backward reference to (a) from within the same lookbehind

new RegExp("(\\1)"); // nested reference to (\1)

/^((a)\1)$/; // nested reference to ((a)\1)

/a(?<foo>(.)b\1)/; // nested reference to (?<foo>(.)b\1)

/a(?!(b)).\1/; // reference to (b) into a negative lookahead

/(?<!(a))b\1/; // reference to (a) into a negative lookbehind
```

**Good**

```javascript
/^(?:(a)|(b)\2)$/; // reference to (b)

/(a)\1/; // reference to (a)

RegExp("(a)\\1(b)"); // reference to (a)

/(a)(b)\2(c)/; // reference to (b)

/(?<foo>a)\k<foo>/; // reference to (?<foo>a)

/(?<=\1(a))b/; // reference to (a), correctly before the group as they're in the same lookbehind

/(?<=(a))b\1/; // reference to (a), correctly after the group as the backreference isn't in the lookbehind

new RegExp("(.)\\1"); // reference to (.)

/^(?:(a)\1)$/; // reference to (a)

/^((a)\2)$/; // reference to (a)

/a(?<foo>(.)b\2)/; // reference to (.)

/a(?!(b|c)\1)./; // reference to (b|c), correct as it's from within the same negative lookahead

/(?<!\1(a))b/; // reference to (a), correct as it's from within the same negative lookbehind
```

#### ESLint Rule

```json
{ "no-useless-backreference": "error" }
```

<!-- end Regular Expressions -->

## Functions

If more than one parameter has the same name in a function definition, the last occurrence "shadows" the preceding occurrences. A duplicated name might be a typing error.

#### Example

**Bad**

```javascript
function foo(a, b, a) {
  console.log("value of the second a:", a);
}
```

**Good**

```javascript
function foo(a, b, c) {
  console.log(a, b, c);
}
```

#### ESLint Rule

```json
{ "no-dupe-args": "error" }
```

### Function Re-assignment

JavaScript functions can be written as a FunctionDeclaration `function foo() { ... }` or as a FunctionExpression `var foo = function() { ... };`. While a JavaScript interpreter might tolerate it, overwriting/reassigning a function written as a FunctionDeclaration is often indicative of a mistake or issue.

#### Example

**Bad**

```javascript
let a = function hello() {
  hello = 123;
};
```

**Good**

```javascript
let a = function hello() {
  otherProperty = 123;
};
```

#### ESLint Rule

```json
{ "no-func-assign": "error" }
```

### Inner Function Declarations

In JavaScript, prior to ES6, a function declaration is only allowed in the first level of a program or the body of another function, though parsers sometimes erroneously accept them elsewhere. This only applies to function declarations; named or anonymous function expressions can occur anywhere an expression is permitted.

#### Example

**Bad**

```javascript
if (test) {
  function doSomething() {}
}
```

**Good**

```javascript
function doSomething() {}

function doSomethingElse() {
  function doAnotherThing() {}
}
```

#### ESLint Rule

```json
{ "no-inner-declarations": "error" }
```

<!-- end Functions -->

## Errors

### No Exception Re-assignment in `catch`

It is possible to re-assign the value of an exception caught in a `catch` block. However there isn't a valid use case to do so.

#### Example

**Bad**

```javascript
try {
  // code
} catch (e) {
  e = 10;
}
```

**Good**

```javascript
try {
  // code
} catch (e) {
  var foo = 10;
}
```

#### ESLint Rule

```json
{ "no-ex-assign": "error" }
```

<!-- end Errors -->

## Stylistic Issues

### Extra Parenthesis

It is recommended to only use parenthesis when they are necessary to avoid unwanted side effects.

#### Example

**Bad**

<!-- prettier-ignore -->
```javascript
a = (b * c);

(a * b) + c;
```

**Good**

```javascript
(0).toString();

a * b + c;
```

> NOTE: this rule is also enforced by Prettier.

#### ESLint Rule

```json5
{
  "no-extra-parens": [
    "off",
    "all",
    {
      conditionalAssign: true,
      nestedBinaryExpressions: false,
      returnAssign: false,
      ignoreJSX: "all", // delegate to eslint-plugin-react
      enforceForArrowConditionals: false,
    },
  ],
}
```

### Extra Semi-colon

Typing mistakes and misunderstandings about where semicolons are required can lead to semicolons that are unnecessary. While not technically an error, extra semicolons can cause confusion when reading code.

#### Example

**Bad**

<!-- prettier-ignore -->
```javascript
var x = 5;;
```

**Good**

```javascript
var x = 5;
```

> NOTE: this rule is also enforced by Prettier.

#### ESLint Rule

```json
{ "no-extra-semi": "error" }
```

## Special Characters

### Irregular Whitespace

Invalid or irregular whitespace causes issues with ECMAScript 5 parsers and also makes code harder to debug in a similar nature to mixed tabs and spaces.

Various whitespace characters can be inputted by programmers by mistake for example from copying or keyboard shortcuts. Pressing Alt + Space on macOS adds in a non breaking space character for example.

A simple fix for this problem could be to rewrite the offending line from scratch. This might also be a problem introduced by the text editor: if rewriting the line does not fix it, try using a different editor.

Known issues these spaces cause:

- Zero Width Space
  - Is NOT considered a separator for tokens and is often parsed as an `Unexpected token ILLEGAL`
  - Is NOT shown in modern browsers making code repository software expected to resolve the visualization
- Line Separator
  - Is NOT a valid character within JSON which would cause parse errors

#### ESLint Rule

```json
{ "no-irregular-whitespace": "error" }
```

## Primitives

### Loss of Precision

JavaScript engines are not required to preserve the precision of floating point numbers. This can cause issues when expecting a number to match the specified value, when it isn't, due to 64-bit floating-point rounding.

#### Example

**Bad**

```javascript
const x = 9007199254740993;
const x = 5123000000000000000000000000001;
const x = 1230000000000000000000000.0;
const x = 0.123;
const x = 0x20000000000001;
const x = 0x2_000000000_0001;
```

**Good**

```javascript
const x = 12345;
const x = 123.456;
const x = 123e34;
const x = 12300000000000000000000000;
const x = 0x1fffffffffffff;
const x = 9007199254740991;
const x = 9007_1992547409_91;
```

#### ESLint Rule

```json
{ "no-loss-of-precision": "error" }
```

### Template Literal Syntax in Regular Strings

In ES6+ it is possible to create a template literal that contains a variable or an expression. This however does not work with regular strings, e.g.: `"${foo}"`, will just be a regular string. Using a regular string with the template literal substitution syntax is most likely an error. It is recommended to use the template literal syntax instead.

When implementing custom parsing algorithms for templating, it is recommended to use a syntax that does not clash with `${}` of the template literal syntax.

#### Example

**Bad**

```javascript
"Hello ${name}!";
"Hello ${name}!";
"Time: ${12 * 60 * 60 * 1000}";
```

**Good**

```javascript
`Hello ${name}!`;
`Time: ${12 * 60 * 60 * 1000}`;

templateFunction`Hello ${name}`;
```

#### ESLint Rule

```json
{ "no-template-curly-in-string": "error" }
```

### Comparison with `NaN`

In JavaScript, `NaN` is a special value of the `Number` type. It's used to represent any of the "not-a-number" values represented by the double-precision 64-bit format as specified by the IEEE Standard for Binary Floating-Point Arithmetic.

Because `NaN` is unique in JavaScript by not being equal to anything, including itself, the results of comparisons to `NaN` are confusing:

- `NaN === NaN` or `NaN == NaN` evaluate to `false`
- `NaN !== NaN` or `NaN != NaN` evaluate to `true`

Therefore, use `Number.isNaN()` or global `isNaN()` functions to test whether a value is `NaN`.

#### Example

**Bad**

```javascript
if (value !== NaN) {
  // ...
}
```

**Good**

```javascript
if (Number.isNaN(value)) {
  // ...
}
```

#### ESLint Rule

```json
{ "use-isnan": "error" }
```

<!-- end Primitives -->

## Arrays

### Sparse Arrays

Sparse arrays are array literals, that have a "gap" between elements, making it hard to read, but also indicating a possible mistake.

Technically JavaScript will insert an `empty` value in place of the missing element, which will make the length `4` in the below example. When enumerating the array with `for` loops, the `empty` value will be enumerated to `undefined`, just like when using `arr.values()` to create an iterator, however when using `.forEach()` or `.map()` it will be skipped. If you `.filter()` the array, the empty value will be filtered out, regardless of what the argument of `.filter()` returns. All of this can be incredibly confusing for beginners and seasoned developers alike.

#### Example

**Bad**

```javascript
const items = [1, , 2, 3];
```

**Good**

```javascript
const items = [1, 2, 3];
```

#### ESLint Rule

```json
{ "no-sparse-arrays": "error" }
```

<!-- end Arrays -->

## Expressions

### Unexpected Multiline Expressions

Semicolons are usually optional in JavaScript, because of automatic semicolon insertion (ASI). You can require or disallow semicolons with the semi rule.

The rules for ASI are relatively straightforward: As once described by Isaac Schlueter, a newline character always ends a statement, just like a semicolon, except where one of the following is true:

- The statement has an unclosed paren, array literal, or object literal or ends in some other way that is not a valid way to end a statement. (For instance, ending with `.` or `,`.)
- The line is `--` or `++` (in which case it will decrement/increment the next token.)
- It is a `for()`, `while()`, `do`, `if()`, or `else`, and there is no `{`
- The next line starts with `[`, `(`, `+`, `*`, `/`, `-`, `,`, `.`, or some other binary operator that can only be found between two tokens in a single expression.

In the exceptions where a newline does not end a statement, a typing mistake to omit a semicolon causes two unrelated consecutive lines to be interpreted as one expression. Especially for a coding style without semicolons, readers might overlook the mistake. Although syntactically correct, the code might throw exceptions when it is executed.

#### Example

**Bad**

<!-- prettier-ignore -->
```javascript
const foo = bar
(1 || 2).baz();

const hello = 'world'
[1, 2, 3].forEach(addNumber);

let x = function() {}
`hello`

let x = function() {}
x
`hello`

let x = foo
/regex/g.test(bar)
```

**Good**

```javascript
const foo = bar;
(1 || 2).baz();

const hello = "world";
[1, 2, 3].forEach(addNumber);

let hello = "world";
void [1, 2, 3].forEach(addNumber);

let x = function () {};
`hello`;

let tag = function () {};
tag`hello`;
```

> NOTE: Prettier will automatically format your code as such that it becomes readable as it would be interpreted with ASI. This way, mistakes become immediately apparent.

#### ESLint Rule

```json
{ "no-unexpected-multiline": "error" }
```

### Valid `typeof`

It is recommended to always use `typeof` comparisons paired with a string literal that is valid, otherwise the condition will return `false` or in case of comparison against variables, it will have a chance to unexpectedly return `false`.

#### Example

**Bad**

```javascript
typeof foo === undefined;
typeof foo === someType;
typeof foo === "srting";
```

**Good**

```javascript
typeof foo === "undefined";
typeof foo === "string";
```

#### ESLint Rule

```json
{ "valid-typeof": ["error", { "requireStringLiterals": true }] }
```

<!-- end Expression -->

## Control Statements

### Unreachable Code

`return`, `throw`, `break`, `continue`, and continue statements divert the flow of the program. Using these statements it is possible to create code that is technically impossible to reach. Writing such code is most likely a mistake or is remnants of refactoring.

Another way to produce unreachable code is to not use `super()`, when subclassing a class while having a `constructor` method.

#### Example

**Bad**

```javascript
function example() {
  return;
  console.log("This code is unreachable");
}

function example() {
  throw new Error("Oops");
  console.log("This code is unreachable");
}

while (true) {
  break;
  console.log("This code is unreachable");
}

switch (foo) {
  case 1:
    break;
    console.log("This code is unreachable");
}

for (;;) {}
console.log("This code is unreachable");

class C extends B {
  #x; // unreachable
  #y = 1; // unreachable
  a; // unreachable
  b = 1; // unreachable

  constructor() {
    return {};
  }
}
```

**Good**

> NOTE: the below examples are invalidated by other rules, but are technically reachable due to hoisting or `var` and `function`.

```javascript
function foo() {
  return bar();
  function bar() {
    return 1;
  }
}

function bar() {
  return x;
  var x;
}

switch (foo) {
  case 1:
    break;
    var x;
}

// This is ok
class E extends B {
  #x;
  #y = 1;
  a;
  b = 1;

  // implicit constructor always calls `super()`
}
```

#### ESLint Rule

```json
{ "no-unreachable": "error" }
```

### Unsafe `finally`

JavaScript suspends the control flow statements of `try` and `catch` blocks until the execution of `finally` block finishes. So, when `return`, `throw`, `break`, or `continue` is used in `finally`, control flow statements inside `try` and `catch` are overwritten, which is considered as unexpected behavior.

This is not only confusing, but is often the cause of bugs in software. It is therefore recommended to avoid using control statements in `finally` blocks.

#### Example

**Bad**

```javascript
try {
  return 1; // we expect this to return 1
} catch {
  return 2;
} finally {
  return 3; // instead it returns 3
}

try {
  throw new Error("Oops"); // we expect this error to be caught by `catch`
} catch {
  return 2; // we expect to return 2
} finally {
  return 3; // instead it returns 3
}
```

**Good**

```javascript
try {
  return 1;
} catch {
  return 2;
} finally {
  console.log("done");
}
```

#### ESLint Rule

```json
{ "no-unsafe-finally": "error" }
```

<!-- end Control Statements -->
