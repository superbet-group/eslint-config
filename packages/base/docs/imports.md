---
title: Imports
description: Rules and conventions related to ES6 imports and module system
tags:
  - tooling
  - errors
  - programming
  - code
  - guidelines
  - standards
  - modules
---

# Imports

Rules and conventions related to ES6 `import`s.

> NOTE: the majority of `import` errors can be avoided by using TypeScript instead of JavaScript. Difference is, except for getting support from linters, like ESLint, you get first class compiler support from TypeScript.

## No Unresolved

It is usually a developer error to include imports that that the compiler cannot resolve. Example cases of these creeping into a codebase include:

1. Copy/pasted code that is not in the same directory as the file it is being imported from.
2. Copy/pasted code from another project that does not have a dependency that is required in the code.
3. Refactoring where the code that is imported was moved or removed.
4. Library got updated and it no longer exports an import.

Valid cases of unresolved imports are:

1. Dynamically checking if a dependency is available, e.g.: check if we have `sharp` installed, if not, we use another image optimising library.
2. Using an import that is dynamically generated, e.g.: importing `virtual:pwa-register` from `vite-plugin-pwa`, that gets generated at build/dev time.

### Example

**Bad**

```javascript
import mod from "some-non-existent-module";
```

**Good**

```javascript
import mod from "installed-dependency";
```

### ESLint Rule

```json
{
  "import/no-unresolved": ["error", { "commonjs": true, "caseSensitive": true }]
}
```

## All Named Imports Exist

Importing a named module that does not exist is usually a developer error and should be avoided.

### Example

**Bad**

```javascript
// foo.js
export const foo = "foo";

// bar.js
import { nonExistent } from "./foo";
```

**Good**

```javascript
// foo.js
export const foo = "foo";

// bar.js
import { foo } from "./foo";
```

### ESLint Rule

```json
{ "import/named": "error" }
```

### Shadowing Import or Exports

Shadowing imports and exports is when you export something with the same name as an already exported module member. This causes confusion in many builds tools and can lead to bugs where a given export is not what the developer expects.

### Example

**Bad**

```javascript
export default class MyClass { /*...*/ } // Multiple default exports.

function makeClass() { return new MyClass(...arguments) }

export default makeClass // Multiple default exports.

export const foo = function () { /*...*/ } // Multiple exports of name 'foo'.

function bar() { /*...*/ }
export { bar as foo } // Multiple exports of name 'foo'.

```

**Good**

```javascript
class MyClass {}

export default function makeClass() {
  return new MyClass(...arguments);
}

export const foo = function () {
  /*...*/
};

function bar() {
  /*...*/
}

export { bar };
```

### ESLint Rule

```json
{ "import/export": "error" }
```

## Naming `default` Imports the Same as Named Exports

A common source of confusion and bugs is when someone imports the `default` export from a file with the same name as another exported named member.

### Example

**Bad**

```javascript
// sw.js
export default function registerServiceWorker() {}
export default function uninstallServiceWorker() {}

export default {
  registerServiceWorker,
  uninstallServiceWorker,
};

// another file

import registerServiceWorker from "./sw.js";

registerServiceWorker.registerServiceWorker();
```

**Good**

```javascript
export default function registerServiceWorker() {}
export default function uninstallServiceWorker() {}

// another file

import { registerServiceWorker } from "./sw.js";

registerServiceWorker();

// or

import * as serviceWorker from "./sw.js";

serviceWorker.registerServiceWorker();
```

### ESLint Rule

```json
{ "import/no-named-as-default": "error" }
```

## Accessing Same Property Member as a Named Export

Accessing the same named property on a `default` export as an exported named `export` is likely a mistake.

Named import syntax looks very similar to destructuring assignment. It's easy to make the (incorrect) assumption that named exports are also accessible as properties of the default export.

### Example

**Bad**

```javascript
// foo.js
export default "foo";
export const bar = "baz";

// bar.js
import foo from "./foo.js";
const bar = foo.bar;
```

**Good**

```javascript
export default "foo";
export const bar = "baz";

// bar.js
import foo, { bar } from "./foo.js";
```

### ESLint Rule

```json
{ "import/no-named-as-default-member": "error" }
```

## Extraneous Dependencies

Using a dependency that is not required is usually a mistake. This can produce a lot of undesired or unexpected behavior, such as a package resolving by a mistake to a version that is not compatible with the current project.

### ESLint Rule

```json5
{
  "import/no-extraneous-dependencies": [
    "error",
    {
      devDependencies: [
        "test/**", // tape, common npm pattern
        "tests/**", // also common npm pattern
        "spec/**", // mocha, rspec-like pattern
        "**/__tests__/**", // jest pattern
        "**/__mocks__/**", // jest pattern
        "test.{js,jsx}", // repos with a single test file
        "test-*.{js,jsx}", // repos with multiple top-level test files
        "**/*{.,_}{test,spec}.{js,jsx}", // tests where the extension or filename suffix denotes that it is a test
        "**/jest.config.js", // jest config
        "**/jest.setup.js", // jest setup
        "**/vue.config.js", // vue-cli config
        "**/webpack.config.js", // webpack config
        "**/webpack.config.*.js", // webpack config
        "**/rollup.config.js", // rollup config
        "**/rollup.config.*.js", // rollup config
        "**/gulpfile.js", // gulp config
        "**/gulpfile.*.js", // gulp config
        "**/Gruntfile{,.js}", // grunt config
        "**/protractor.conf.js", // protractor config
        "**/protractor.conf.*.js", // protractor config
        "**/karma.conf.js", // karma config
        "**/.eslintrc.js", // eslint config
      ],
      optionalDependencies: false,
    },
  ],
}
```

## Mutable Exports

One can use `var` or `let` to define exports that are mutable, however this is usually a mistake and can introduce an array of hard to diagnose issues when these variables inevitable get overwritten.

### Example

**Bad**

```javascript
// math.js
export let PI = Math.PI;

// another file
import { PI } from "./math.js";

// make PI simpler
PI = 3.14;
```

**Good**

```javascript
// math.js
export const PI = Math.PI;

// another file
import { PI } from "./math.js";

const simplePI = 3.14;
```

### ESLint Rule

```json
{ "import/no-mutable-exports": "error" }
```

## No AMD `require`/`define`

AMD style imports and exports (`require`/`define`) are generally deprecated by modern build tools in favour of ES6 module syntax. Some codebases may still have some imports with such syntax. It is recommended to migrate away as soon as possible.

### Example

**Bad**

```javascript
// foo.js
define(["foo"], function () {
  return {
    foo: "foo",
  };
});

// bar.js
require(["foo"], function (foo) {
  console.log(foo.foo);
});
```

**Good**

```javascript
// foo.js
export const foo = "foo";

// bar.js
import { foo } from "./foo.js";
```

### ESLint Rule

```json
{ "import/no-amd": "error" }
```

## `require` Statements

It is possible to disallow the use of `require` statements, however given that some build tools still actively rely on `require` statements, this is not recommended yet. In the future this will be reconsidered.

### ESLint Rule

```json
{ "import/no-commonjs": "off" }
```

## No Node.JS Builtin Modules

Not all projects have Node.JS as a runtime environment. Build tools like Webpack provide a shim for Node.JS built in modules in other environments, however relying on this mechanism is not recommended.

### Example

**Bad**

```javascript
import { promises } from "fs";

await promises.readFile("foo.txt");
```

**Good**

```javascript
import { readFile } from "cross-platform-fs-lib";

await readFile("foo.txt");
```

### ESLint Rule

```json
{ "import/no-nodejs-modules": "error" }
```

## No Unnecessary Statements Before `import`

It is only required in rare cases to have to rely on a statement before `import` statements. It is not recommended to use other statements before `import` statements.

### Example

**Bad**

```javascript
import { foo } from "./foo.js";

initFoo(foo);

import { bar } from "./bar.js";
```

**Good**

```javascript
import { foo } from "./foo.js";
import { bar } from "./bar.js";

initFoo(foo);
```

### ESLint Rule

```json
{ "import/first": "error" }
```

## Duplicate `import`s

It is possible to `import` from the same module multiple times, however this is not recommended for maintainability purposes. Resolving merge conflicts is a real pain when you have to keep track of multiple instances of `import`s from the same file too.

### Example

**Bad**

```javascript
import { foo } from "./foo.js";
import { bar } from "./bar.js";
import { isFoo } from "./foo.js";
```

**Good**

```javascript
import { foo, isFoo } from "./foo.js";
import { bar } from "./bar.js";
```

### ESLint Rule

```json
{ "import/no-duplicates": "error" }
```

## Import Extensions

Some file resolve algorithms allow you to omit the file extension within the import source path. For example the Node.JS resolver can resolve `./foo/bar` to the absolute path `/User/someone/foo/bar.js` because the `.js` extension is resolved automatically by default. Depending on the resolver you can configure more extensions to get resolved automatically.

### Example

**Bad**

```javascript
import foo from "./foo.js";

import bar from "./bar.json";

import Component from "./Component.jsx";

import express from "express/index.js";
```

**Good**

```javascript
import foo from "./foo";

import bar from "./bar";

import Component from "./Component";

import express from "express";
```

### ESLint Rule

```json
{
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      "js": "never",
      "mjs": "never",
      "jsx": "never"
    }
  ]
}
```

## Import Order

This is a dreaded convention that, when enforced can save countless hours of merge conflict resolutions. The order of `import` statements should depend on the source file and where it resides relative to the directory structure.

### Example

**Bad**

```javascript
import "./b.js";
import express from "express";
import "./a.js";

import something from "@/internal/something";
```

**Good**

```javascript
import express from "express";

import something from "@/internal/something";

import "./a.js";
import "./b.js";
```

> NOTE: this rule is set up so that `@/**` are considered local imports that are relative to the root projects and so treated as external but added afterwards.

### ESLint Rule

```json
{
  "import/order": [
    "error",
    {
      "groups": ["builtin", "external", "parent", "sibling", "index"],
      "pathGroups": [
        {
          "pattern": "@/**",
          "group": "external",
          "position": "after"
        }
      ],
      "newlines-between": "always",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true
      },
      "warnOnUnassignedImports": false
    }
  ]
}
```

## Newline After `import`

We require a newline after `import` statements. This is to prevent merges conflicting added import statements with added functionality.

### Example

**Bad**

```javascript
import foo from "./foo.js";
function someFeature() {
  return foo;
}
```

**Good**

```javascript
import foo from "./foo.js";

function someFeature() {
  return foo;
}
```

### ESLint Rule

```json
{ "import/newline-after-import": "error" }
```

## Prefer `default` Export

Files with a single `export` should use the `default` export, because:

1. The case for using named exports with single export files is that you'll get better editor support, which is not the case with modern editors. Any IDE will be able to resolve a good name for a `default` export using the name of the file.
2. Enforces single responsibility principle by design.
3. If the file is destined to have multiple exports in the future it may be tempting to disobey this rule, however if you consider software to be derived from a list of valid past states, you will find it's easier to adhere to rules at all times and modify a `default` export to a named one in the future when you need it. 90% of the time you'll find that time will never come.

### Example

**Bad**

```javascript
export const foo = () => {};
```

**Good**

```javascript
export const foo = () => {};
export const bar = () => {};

// or

export default function foo() {}
```

### ESLint Rule

```json
{ "import/prefer-default-export": "error" }
```

## Absolute `import` Paths

Node.JS allows the import of modules using an absolute path such as `/home/xyz/file.js`. That is a bad practice as it ties the code using it to your computer, and therefore makes it unusable in packages distributed on `npm` for instance.

### Example

**Bad**

```javascript
import something from "/Users/daniel.kovacs/projects/myProject/something.js";
```

**Good**

```javascript
import something from "../something.js";
```

### ESLint Rule

```json
{ "import/no-absolute-path": "error" }
```

## Dynamic Require

The require method from CommonJS is used to import modules from different files. Unlike the ES6 `import` syntax, it can be given expressions that will be resolved at runtime. While this is sometimes necessary and useful, in most cases it isn't. Using expressions (for instance, concatenating a path and variable) as the argument makes it harder for tools to do static code analysis, or to find where in the codebase a module is used.

### Example

**Bad**

```javascript
require(name);
require("../" + name);
require(`../${name}`);
require(name());
```

**Good**

```javascript
require("../name");
require(`../name`);
```

### ESLint Rule

```json
{ "import/no-dynamic-require": "error" }
```

## Webpack Loader Syntax

It is forbidden to use Webpack loader syntax in imports.

Webpack allows specifying the loaders to use in the import source string using a special syntax like this:

```javascript
var moduleWithOneLoader = require("my-loader!./my-awesome-module");
```

This syntax is non-standard, so it couples the code to Webpack. The recommended way to specify Webpack loader configuration is in a Webpack configuration file.

### Example

**Bad**

```javascript
import myModule from "my-loader!my-module";
import theme from "style!css!./theme.css";

var myModule = require("my-loader!./my-module");
var theme = require("style!css!./theme.css");
```

**Good**

```javascript
import myModule from "my-module";
import theme from "./theme.css";

var myModule = require("my-module");
var theme = require("./theme.css");
```

### ESLint Rule

```json
{ "import/no-webpack-loader-syntax": "error" }
```

## Named `default`

It is possible, however discouraged, to `import` `default` exports under the name `"default"`. There is special syntax to `import` a `default export`. Just use it.

### Example

**Bad**

```javascript
import { default as foo } from "./foo.js";
import { default as foo, bar } from "./foo.js";
```

**Good**

```javascript
import foo from "./foo.js";
import foo, { bar } from "./foo.js";
```

### ESLint Rule

```json
{ "import/no-named-default": "error" }
```

## Anonymous `default` Export

It is not recommended to `export default` an anonymous value. This will not only make it more difficult to provide suggestions for some editors, it can break mechanisms that rely on naming, e.g.: Hot Module Replacement.

### Example

**Bad**

```javascript
export default []

export default () => {}

export default class {}

export default function () {}

export default 123

export default {}

```

**Good**

```javascript
const foo = 123
export default foo

export default class MyClass() {}

export default function foo() {}

```

### ESLint Rule

```json
{ "import/no-anonymous-default-export": "error" }
```

## No Self-Imports

It is possible, however heavily discouraged for a module to import itself. This produces behaviour that is almost always not desirable and is not straightforwad. These usually get introduced to the codebase by accident via refactorings.

### Example

**Bad**

```javascript
// foo.js
export const bar = () => {};

import { bar } from "./foo.js";
```

**Good**

```javascript
// foo.js

import { bar } from "./bar.js";
```

### ESLint Rule

```json
{ "import/no-self-import": "error" }
```

## Dependency Cycles

Dependency cycles are when modules are imported and and used in files that import from files that provide dependencies to the file that was first in this chain. This can lead to deoptimisation by compilers as well as some bugs, e.g.: Webpack famously can resolve dependency cycles to `undefined` leaving you to scratch your head where your code went wrong.

### Example

**Bad**

```javascript
// dep-c.js
import "./dep-a.js";

// dep-b.js
import "./dep-c.js";

export function b() {
  /* ... */
}
```

### ESLint Rule

```json
{ "import/no-cycle": "error" }
```

## Useless Path Segments

Not all segments of the path are required to resolve a dependency. A famous example is leading `./` in paths that go up the directory tree already with `../`.

### Example

**Bad**

```javascript
import "./../pages/about.js";
import "./../pages/about";
import "./pages//about";
import "./pages/";
```

**Good**

```javascript
import "../pages/about.js";
import "../pages/about";
import "./pages/about";
import "./pages";
```

### ESLint Rule

```json
{ "import/no-useless-path-segments": ["error", { "commonjs": true }] }
```

## Mixing CommonJS and ES Modules

It is discouraged to mix CommonJS and ES Modules. This is because CommonJS modules are not transpiled to ES Modules, and depending on the compiler may have different behaviour compared to ES Modules.

### Example

**Bad**

```javascript
import { stuff } from "starwars";
module.exports = thing;

import * as allThings from "starwars";
exports.bar = thing;

import thing from "other-thing";
exports.foo = bar;

import thing from "starwars";
const baz = (module.exports = thing);
console.log(baz);
```

**Good**

```javascript
import thing from "other-thing";
export default thing;
// other file
const thing = require("thing");
module.exports = thing;
// other file
const thing = require("thing");
exports.foo = bar;
// other file
import thing from "otherthing";
console.log(thing.module.exports);
```

### ESLint Rule

```json
{
  "import/no-import-module-exports": [
    "error",
    {
      "exceptions": []
    }
  ]
}
```

## Wrong Use of Relative Imports

It's useful in Yarn/Lerna workspaces, were it's possible to import a sibling package using ../package relative path, while direct package is the correct one.

### Example

Given the following directory structure:

```sh
my-project
├── packages
│   ├── foo
│   │   ├── index.js
│   │   └── package.json
│   └── bar
│       ├── index.js
│       └── package.json
└── entry.js
```

**Bad**

```javascript
/**
 *  in my-project/packages/foo.js
 */

import bar from "../bar"; // Import sibling package using relative path
import entry from "../../entry.js"; // Import from parent package using relative path

/**
 *  in my-project/entry.js
 */

import bar from "./packages/bar"; // Import child package using relative path
```

**Good**

```javascript
/**
 *  in my-project/packages/foo.js
 */

import bar from "bar"; // Import sibling package using package name

/**
 *  in my-project/entry.js
 */

import bar from "bar"; // Import sibling package using package name
```

### ESLint Rule

```json
{ "import/no-relative-packages": "error" }
```
