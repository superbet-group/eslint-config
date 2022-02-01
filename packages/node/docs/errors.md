---
title: Node.JS Rules
description: Best practices for writing applications with Node.JS.
tags:
  - eslint
  - programming
  - best practices
  - guidelines
  - node.js
---

# Node.JS Rules

## Callbacks

Node.JS convetionally uses callbacks for asynchronous operations. When a variable is named `callback` or `cb` it is expected that it will behave like a Node.JS native callback function. It should take an `Error` as its first argument and a `result` as its second argument.

### Example

**Bad**

```js
cb("this is an error string");
cb({ a: 1 });
callback(0);
```

**Good**

```js
cb(undefined);
cb(null, 5);
callback(new Error("some error"));
callback(someVariable);
```

### ESLint Rule

```json
{ "node/no-callback-literal": "error" }
```

## Assigning to Exports

Assigning to the `exports` variable does not work as intented. Use `module.exports` instead.

### Example

**Bad**

```js
exports = {
  a: 1,
};
```

**Good**

```js
module.exports = {
  a: 1,
};
```

### ESLint Rule

```json
{ "node/no-exports-assign": "error" }
```

## Unpublished Binaries

Given the following in your `package.json`:

```json
{
  "name": "command-name",
  "bin": "bin/index.js"
}
```

When your package is installed, it will be able to run `bin/index.js` when you run `command-name`.

`bin/index.js` has to be available for the package to run it. Files ignored by `npm` should not be referenced here.

### ESLint Rule

```json
{ "node/no-unpublished-bin": "error" }
```

## Unsupported ES Builtins

ECMAScript standard is updating every two months. You can check [node.green](https://node.green) to know which Node.JS version supports each ECMAScript feature.

This rule reports unsupported ECMAScript built-in variables on the configured Node.JS version as lint errors.

### ESLint Rule

```json
{ "node/no-unsupported-features/es-builtins": "error" }
```

## Unsupported ES Syntax

Similar to the `es-builtins` rule, this rule reports unsupported ECMAScript syntax on the configured Node.JS version as lint errors.

### ESLint Rule

```json
{ "node/no-unsupported-features/es-syntax": "error" }
```

## Unsupported Node.JS Builtins

Node.JS evolves over time as new features are added and old ones are removed. This rule helps you avoid using unsupported built in Node.JS features.

### ESLint Rule

```json
{ "node/no-unsupported-features/node-builtins": "error" }
```

## `process.exit()`

Calling `process.exit()` finishes the program, which means that the code path afterwards this expression is unreachable and therefore should be considered to be similar code path to `throw` expressions.

```js
function foo(a) {
  if (a) {
    return new Bar();
  } else {
    process.exit(1);
  }
}
```

### ESLint Rule

```json
{ "node/process-exit-as-throw": "error" }
```

## Shebang

If you have a file that should be ran as a binary, you should use a shebang to instruct the operating system how to execute it. Conversely, if you have a file that isn't intended to be ran as a standalone script, you should not include the shebang.

### Example

**Bad**

```js
console.log("hello");
```

**Good**

```js
#!/usr/bin/env node

console.log("hello");
```

### ESLint Rule

```json
{ "node/shebang": "error" }
```
