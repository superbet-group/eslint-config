---
title: Variables
description: Rules for writing clearer codebases around working with variables
tags:
  - tooling
  - errors
  - programming
  - code
  - guidelines
---

# Best Practices for Variables

To declare a variable, pre-ES6, you use the `var` keyword. ES6+ codebases should always use `let` and `const` instead.

You should always strive to use `const` wherever possible, but not at the expense of readability. `const` ensures that the primitive value does not get changed and it is encouraged to embrace immutability wherever possible.

## Do Not Delete Variables

The `delete` keyword is not designed to work on variables, so it should not be used.

### Example

**Bad**

```javascript
var x;
delete x;
```

### ESLint Rule

```json
{ "no-delete-var": "error" }
```

## Do Not Name Labels the Same Name as Variables

To help avoid confusion around what is a variable and what is a label, it is recommended to use different names for variables and labels.

### Example

**Bad**

```javascript
var x = foo;
function bar() {
  x: for (;;) {
    break x;
  }
}
```

**Good**

```javascript
function foo() {
  var q = t;
}

function bar() {
  q: for (;;) {
    break q;
  }
}
```

### ESLint Rule

```json
{ "no-label-var": "error" }
```

## Restricted Global Variables

Some globals are confusing or have better alternatives.

The [following list of confusing browser globals](https://github.com/facebook/create-react-app/blob/main/packages/confusing-browser-globals/index.js) is disallowed. Furthermore, it is encouraged to use `Number.isFinite` instead of `isFinite` and `Number.isNaN` instead of `isNaN`, because both of them coerce their arguments to numbers, which may not be what you intended to do. To help fix this, you can explicitly use `parseInt` or `parseFloat` to coerce the argument to a number.

### ESLint Rule

```js
{
  'no-restricted-globals': [
      'error',
      {
        name: 'isFinite',
        message:
          'Use Number.isFinite instead',
      },
      {
        name: 'isNaN',
        message:
          'Use Number.isNaN instead',
      },
    ].concat(confusingBrowserGlobals),
}
```

## No Shadowing

Shadowing a variable is when you define a variable in an inner scope with the same name as one from the outer scope, that would otherwise still be accessible from the scope in question. This is confusing, because it's harder to figure out which value that specific variable is referring to. It is best to avoid shadowing variables.

### Example

**Bad**

```javascript
var myNumber = 3;
function magicFunction() {
  var myNumber = 10;
}
```

**Good**

```javascript
var myNumber = 3;
function magicFunction() {
  var myMagicNumber = 10;
}
```

### ESLint Rule

```json
{ "no-shadow": "error" }
```

## Shadowing of Restricted Names

ES5 §15.1.1 Value Properties of the Global Object (`NaN`, `Infinity`, `undefined`) as well as strict mode restricted identifiers eval and arguments are considered to be restricted names in JavaScript. Defining them to mean something else can have unintended consequences and confuse others reading the code. For example, there's nothing preventing you from writing:

```javascript
var undefined = "foo";
```

Then any code used within the same scope would not get the global `undefined`, but rather the local version with a very different meaning.

### Example

**Bad**

```javascript
function NaN() {}

!function (Infinity) {};

var undefined = 5;

try {
} catch (eval) {}
```

**Good**

```javascript
var Object;

function f(a, b) {}

// Exception: `undefined` may be shadowed if the variable is never assigned a value.
var undefined;
```

### ESLint Rule

```json
{ "no-shadow-restricted-names": "error" }
```

## Do Not Use Not Defined Variables

This will cause a `ReferenceError` to be thrown. If you're sure that the given variable is in fact defined, make sure you add it to the ESLint `globals` list.

### ESLint Rule

```json
{ "no-undef": "error" }
```

## Do Not Explicitly Initialise to `undefined`

In JavaScript, a variable that is declared and not initialized to any value automatically gets the value of `undefined`. There is no point in explicitly initializing a variable to `undefined`.

### Example

**Bad**

```javascript
let variable = undefined;
```

**Good**

```javascript
let variable;
```

### ESLint Rule

```json
{ "no-undef-init": "error" }
```

## Do Not Create Unused Variables

Variables that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring. Such variables take up space in the code and can lead to confusion by readers.

### Example

**Bad**

```javascript
let a;

function hasManyArguments(first, used, not, the, rest) {
  console.log(first);
}
```

**Good**

```javascript
function hasManyArguments(but, only, thirdUsed) {
  console.log(thirdUsed);
}

function reducer(state, _action) {
  return state;
}
```

> NOTE: you may need to define an argument, for example with Redux Toolkit + TypeScript if you want to add typing for a reducer's action creator but don't use that action in the reducer (e.g.: middleware use action).

### ESLint Rule

```json
{
  "no-unused-vars": [
    "error",
    {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": true,
      "argsIgnorePattern": "^_"
    }
  ]
}
```

## No Early Use

In JavaScript, prior to ES6, variable and function declarations are hoisted to the top of a scope, so it's possible to use identifiers before their formal declarations in code. This can be confusing and some believe it is best to always declare variables and functions before using them.

In ES6, block-level bindings (`let` and `const`) introduce a "temporal dead zone" where a `ReferenceError` will be thrown with any attempt to access the variable before its declaration.

### Example

**Bad**

```javascript
alert(a);
var a = 10;

f();
function f() {}

function g() {
  return b;
}
var b = 1;

{
  alert(c);
  let c = 1;
}

{
  class C extends C {}
}

{
  class C {
    static x = "foo";
    [C.x]() {}
  }
}

{
  const C = class {
    static x = C;
  };
}

{
  const C = class {
    static {
      C.x = "foo";
    }
  };
}
```

**Good**

```javascript
var a;
a = 10;
alert(a);

function f() {}
f(1);

var b = 1;
function g() {
  return b;
}

{
  let c;
  c++;
}

{
  class C {
    static x = C;
  }
}

{
  const C = class C {
    static x = C;
  };
}

{
  const C = class {
    x = C;
  };
}

{
  const C = class C {
    static {
      C.x = "foo";
    }
  };
}
```

### ESLint Rule

```json
{
  "no-use-before-define": [
    "error",
    { "functions": true, "classes": true, "variables": true }
  ]
}
```
