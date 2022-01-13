---
title: Base TypeScript Rules
description: Base rules for TypeScript codebases enforced by ESLint.
tags:
  - eslint
  - programming
  - best practices
  - guidelines
  - typescript
---

# Base TypeScript Rules

We currently recommend to use TypeScript when starting a new project. It is a superset of JavaScript, and provides a couple of features on top of it, such as support for ESNext features and a typing system, which can help catch bugs and errors during build time. It also comes with broad IDE support. With fast build tools, like [esbuild](https://esbuild.github.io/), there's no good excuse not to use it.

## Stylistic Rules

There are a lot of either/or type of decisions in TypeScript. The purpose of a guide like this is to remove as many decisions as possible. Some of these recommendations may seem to be a bit of a stretch at first but using them consistently will help you to write more maintainable code.

### Adjacent Overload Signatures

Grouping overloaded members together can improve readability of the code.

#### Example

**Bad**

```typescript
export function foo(s: string): void;
export function foo(n: number): void;
export function bar(): void;
export function foo(sn: string | number): void;
```

**Good**

```typescript
export function foo(s: string): void;
export function foo(n: number): void;
export function foo(sn: string | number): void;
export function bar(): void;
```

#### ESLint Rule

```json
{ "@typescript-eslint/adjacent-overload-signatures": "error" }
```

### Array Type

There are two ways to type an `Array` in TypeScript: `Array<Type>` and `Type[]`. The former is more verbose, while the latter is still expressive enough to convey the meaning. Both have precedent in other languages. We recommend using `Type[]` syntax for arrays.

#### Example

**Bad**

```typescript
const names: Array<string> = [];
```

**Good**

```typescript
const names: string[] = [];
```

#### ESLint Rule

```json
{ "@typescript-eslint/array-type": "error" }
```

### Type Assertions

This rule aims to standardize the use of type assertion style across the codebase.

Type assertions are also commonly referred as "type casting" in TypeScript (even though it is technically slightly different to what is understood by type casting in other languages), so you can think of type assertions and type casting referring to the same thing. It is essentially you saying to the TypeScript compiler, "in this case, I know better than you!".

In addition to ensuring that type assertions are written in a consistent way, this rule also helps make your codebase more type-safe.

We recommend using `as ...` syntax for type assertions, because `<type>` syntax conflicts with generics and `JSX`.

#### Example

**Bad**

```typescript
const x = { ... } as T;

function foo(min, max) {
  const message = <string>min;
  return { ... } as T;
}

```

**Good**

```typescript
const x: T = { ... };

function foo(min, max): T {
  const message = min as string;
  return { ... };
}

foo({ ... } as T);
```

#### ESLint Rule

```json
{
  "@typescript-eslint/consistent-type-assertions": [
    "error",
    {
      "assertionStyle": "as",
      "objectLiteralTypeAssertions": "allow-as-parameter"
    }
  ]
}
```

### Member Delimiter

We recommend always using `;` as the member delimiter in `type` declarations.

#### Example

**Bad**

<!-- prettier-ignore -->
```typescript
type Foo = {
  bar: string,
  baz: number,
};

type Foo = {
  bar: string
  baz: number
};
```

**Good**

```typescript
type Foo = {
  bar: string;
  baz: number;
};
```

> NOTE: Prettier also enforces this rule.

#### ESLint Rule

```json
{ "@typescript-eslint/member-delimiter-style": "error" }
```

### Member Ordering

A consistent ordering of fields, methods and constructors can make interfaces, type literals, classes and class expressions easier to read, navigate and edit.

#### ESLint Rule

```json
{ "@typescript-eslint/member-ordering": "error" }
```

### Method Signature Style

A good practice is to use the TypeScript's `"strict"` option (which implies `"strictFunctionTypes"`) which enables correct typechecking for function properties only (method signatures get old behavior).

#### Example

**Bad**

```typescript
interface T1 {
  func(arg: string): number;
}
type T2 = {
  func(arg: boolean): void;
};
interface T3 {
  func(arg: number): void;
  func(arg: string): void;
  func(arg: boolean): void;
}
```

**Good**

```typescript
interface T1 {
  func: (arg: string) => number;
}
type T2 = {
  func: (arg: boolean) => void;
};
// this is equivalent to the overload
interface T3 {
  func: ((arg: number) => void) &
    ((arg: string) => void) &
    ((arg: boolean) => void);
}
```

#### ESLint Rule

```json
{ "@typescript-eslint/method-signature-style": ["error", "property"] }
```

<!-- end Stylistic Rules -->

## Promises

`Promise`s are a mechanism of JavaScript to handle asynchronous operations. TypeScript has the same syntactic sugar for `Promise`s as ES6+ does with `async`/`await`.

### Only `await` Thenable

A `Thenable` object is an object with a `then` method. Technically it doesn't have to inherit from `Promise` to be valid and for JS to be able to handle it as such. You can `await` any value, however `await`ing a not `then`able value will be a noop. The most common use-case for this is when you want your function to support passing in both a value and a `Promise`, e.g.:

```typescript
async function foo(value: string | Promise<string>): Promise<string> {
  const result = await value;
  return doSomethingWith(result);
}
```

We recommend explicitly handling this case instead of using `await` to "unwrap" the value, as doing so will inevitably confuse someone who doesn't know this about `await`.

#### Example

**Bad**

```typescript
export async function example(value: number | Promise<number>) {
  const result = await value;
  return result ** 3;
}
```

**Good**

```typescript
export async function example(value: number | Promise<number>) {
  let result = value;
  // `value` is a `Promise<number>`
  if (isThenable(value)) {
    result = await value;
  }
  return result ** 3;
}
```

#### ESLint Rule

```json
{ "@typescript-eslint/await-thenable": "error" }
```

### Handle Errors

Unhandled promises can cause several issues, such as improperly sequenced operations, ignored Promise rejections and more. Valid ways of handling a Promise-valued statement include awaiting, returning, and either calling .then() with two arguments or .catch() with one argument.

#### Example

**Bad**

```typescript
const promise = new Promise((resolve, reject) => resolve("value"));
promise;

async function returnsPromise() {
  return "value";
}
returnsPromise().then(() => {});

Promise.reject("value").catch();

Promise.reject("value").finally();
```

**Good**

```typescript
const promise = new Promise((resolve, reject) => resolve("value"));
await promise;

async function returnsPromise() {
  return "value";
}
returnsPromise().then(
  () => {},
  () => {}
);

Promise.reject("value").catch(() => {});

Promise.reject("value").finally(() => {});
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-floating-promises": "error" }
```

### Misused Promises

We recommend not using promises in places where the TypeScript compiler allows them but they are not handled properly. These situations can often arise due to a missing `await` keyword or just a misunderstanding of the way `async` functions are handled/awaited.

#### Example

**Bad**

```typescript
const promise = Promise.resolve("value");

// always `true`
if (promise) {
  // Do something
}

// always `123`
const val = promise ? 123 : 456;

// infinite loop
while (promise) {
  // Do something
}

[1, 2, 3].forEach(async (value) => {
  await doSomething(value);
});

new Promise(async (resolve, reject) => {
  await doSomething();
  resolve();
});

const eventEmitter = new EventEmitter();
eventEmitter.on("some-event", async () => {
  synchronousCall();
  await doSomething();
  otherSynchronousCall();
});
```

**Good**

```typescript
const promise = Promise.resolve("value");

if (await promise) {
  // Do something
}

const val = (await promise) ? 123 : 456;

while (await promise) {
  // Do something
}

// for-of puts `await` in outer context
for (const value of [1, 2, 3]) {
  await doSomething(value);
}

// If outer context is not `async`, handle error explicitly
Promise.all(
  [1, 2, 3].map(async (value) => {
    await doSomething(value);
  })
).catch(handleError);

// Use an async IIFE wrapper
new Promise((resolve, reject) => {
  // combine with `void` keyword to tell `no-floating-promises` rule to ignore unhandled rejection
  void (async () => {
    await doSomething();
    resolve();
  })();
});

// Name the async wrapper to call it later
const eventEmitter = new EventEmitter();
eventEmitter.on("some-event", () => {
  const handler = async () => {
    await doSomething();
    otherSynchronousCall();
  };

  try {
    synchronousCall();
  } catch (err) {
    handleSpecificError(err);
  }

  handler().catch(handleError);
});
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-misused-promises": "error" }
```

<!-- end Promises -->

## Types

### Banned Types

Some builtin types have aliases, some types are considered dangerous or harmful. It's often a good idea to ban certain types to help with consistency and safety.

- Don't use the upper-case primitive types, you should use the lower-case types for consistency. For example, `number` is a better type than `Number`.
- Avoid the `Function` type, as it provides little safety for the following reasons:
  - It provides no type safety when calling the value, which means it's easy to provide the wrong arguments.
  - It accepts class declarations, which will fail when called, as they are called without the new keyword.
- Avoid the `Object` and `{}` types, as they mean "any non-nullish value".
  - This is a point of confusion for many developers, who think it means "any object type".

#### Example

**Bad**

```typescript
const addChangeListener = (listener: Function) => {
  // ...
};

const isPalindrome = (value: String) => {
  // ...
};

const register = <Config extends {}>(config: Config) => {
  // ...
};
```

**Good**

```typescript
const addChangeListener = (listener: (event: ChangeEvent) => void) => {
  // ...
};

const isPalindrome = (value: string) => {
  // ...
};

const register = <Config extends Record<string, unknown>>(config: Config) => {
  // ...
};
```

#### ESLint Rule

```json
{ "@typescript-eslint/ban-types": "error" }
```

### `Record` Type

It is recommended to use the `Record<K, V>` type instead of `{ [key: K]: V }`, because the former is less syntactically loaded, which makes it easier to read and understand. These two are equal in functionality.

#### Example

**Bad**

```typescript
type Input = { [key: string]: string };
```

**Good**

```typescript
type Input = Record<string, string>;
```

#### ESLint Rule

```json
{ "@typescript-eslint/consistent-indexed-object-style": ["error", "record"] }
```

### `type` vs `interface`

We recommend using `type` over `interface` for type declarations. The reasoning is pretty simple:

- `interface` carries with itself semantic information about inheritence and class system, which is not needed for type declarations.
- `type` has a more natural syntax with `type A = {}`
- Arguably it's more intuitive to combine `type`s with `&` operator, compared to `extend`ing `interface`s.
- `function` typing looks cleaner with `type`s, compared to `interface`s.

#### Example

**Bad**

```typescript
interface Callback<Value> {
  (value: Value): void;
}

interface Props<Value> {
  onChange: Callback<Value>;
  initialvalue: Value;
}

interface NumberInputProps extends Props<number> {
  min: number;
  max: number;
}
```

**Good**

```typescript
type Callback<Value> = (value: Value) => void;

type Props<Value> = {
  onChange: Callback<Value>;
  initialvalue: Value;
};

type NumberInputProps = Props<number> & {
  min: number;
  max: number;
};
```

#### ESLint Rule

```json
{ "@typescript-eslint/consistent-type-definitions": ["error", "type"] }
```

### Type Exports

TypeScript does not require you to specify whether an `export` is a type or a value. It is recommended to always use `export type` for type exports, to explicitly tell the compiler that it's a type export. This can help speed up some build tools and also prevent some errors that bypass type checking and just try to resolve imports.

#### Example

**Bad**

```typescript
type ButtonProps = {};
const Button = () => {};

export { ButtonProps, Button };
```

**Good**

```typescript
type ButtonProps = {};
const Button = () => {};

export { type ButtonProps, Button };
```

#### ESLint Rule

```json
{
  "@typescript-eslint/consistent-type-exports": [
    "error",
    { "fixMixedExportsWithInlineTypeSpecifier": true }
  ]
}
```

### Type Imports

TypeScript 3.8 added support for type-only imports. Type-only imports allow you to specify that an import can only be used in a type location, allowing certain optimizations within compilers.

We recommend always using `type` imports.

We also recommend not using `import("type")` annotations as they're not that popular in TS codebases, so their usage might be confusing for some.

#### Example

**Bad**

```typescript
import { Foo } from "Foo";
import Bar from "Bar";
type T = Foo;
const x: Bar = 1;
type T = import("Foo").Foo;
const x: import("Bar") = 1;
```

**Good**

```typescript
import type { Foo } from "Foo";
import type Bar from "Bar";
type T = Foo;
const x: Bar = 1;
```

#### ESLint Rule

```json
{
  "@typescript-eslint/consistent-type-imports": [
    "error",
    { "prefer": "type-imports", "disallowTypeAnnotations": true }
  ]
}
```

### Explicit Function Return Types

Explicit types for function return values makes it clear to any calling code what type is returned. This ensures that the return value is assigned to a variable of the correct type; or in the case where there is no return value, that the calling code doesn't try to use the undefined value when it shouldn't.

This principle can help prevent bugs that occur when you extend the body of a function and mistakenly start returning a different type than the one you intended.

#### Example

**Bad**

```typescript
// Should indicate that no value is returned (void)
function test() {
  return;
}

// Should indicate that a number is returned
const fn = function () {
  return 1;
};

// Should indicate that a string is returned
const arrowFn = () => "test";

class Test {
  // Should indicate that no value is returned (void)
  method() {
    return;
  }
}

const log = (message: string) => void console.log(message);
```

**Good**

```typescript
function test(): void {
  return;
}

// A return value of type number
const fn = function (): number {
  return 1;
};

// A return value of type string
const arrowFn = (): string => "test";

class Test {
  // No return value should be expected (void)
  method(): void {
    return;
  }
}

const callback: Callback<number> = (value) => {
  return value;
};

document.addEventListener("click", (event) => {
  return event.clientX;
});
```

#### ESLint Rule

```json
{
  "@typescript-eslint/explicit-function-return-type": [
    "error",
    {
      "allowExpressions": true,
      "allowTypedFunctionExpressions": true,
      "allowHigherOrderFunctions": true,
      "allowDirectConstAssertionInArrowFunctions": true,
      "allowConciseArrowFunctionExpressionsStartingWithVoid": false
    }
  ]
}
```

### Explicit `any`

Using the `any` type defeats the purpose of using TypeScript. When any is used, all compiler type checks around that value are ignored.

#### Example

**Bad**

```typescript
const age: any = "seventeen";
const ages: any[] = ["seventeen"];
const ages: Array<any> = ["seventeen"];
function greet(): any {}
function greet(): any[] {}
function greet(): Array<any> {}
function greet(): Array<Array<any>> {}
function greet(param: Array<any>): string {}
function greet(param: Array<any>): Array<any> {}
```

**Good**

```typescript
const age = 17;
const ages: number[] = [17];
function greet(): string {}
function greet(): string[] {}
function greet(): Array<string> {}
function greet(): Array<Array<string>> {}
function greet(param: Array<string>): string {}
function greet(param: Array<string>): Array<string> {}
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-explicit-any": "error" }
```

### Unnecessary Type Declarations

Explicit types where they can be easily inferred may add unnecessary verbosity.

#### Example

**Bad**

```typescript
const a: bigint = 10n;
const a: bigint = -10n;
const a: bigint = BigInt(10);
const a: bigint = -BigInt(10);
const a: boolean = false;
const a: boolean = true;
const a: boolean = Boolean(null);
const a: boolean = !0;
const a: number = 10;
const a: number = +10;
const a: number = -10;
const a: number = Number("1");
const a: number = +Number("1");
const a: number = -Number("1");
const a: number = Infinity;
const a: number = +Infinity;
const a: number = -Infinity;
const a: number = NaN;
const a: number = +NaN;
const a: number = -NaN;
const a: null = null;
const a: RegExp = /a/;
const a: RegExp = RegExp("a");
const a: RegExp = new RegExp("a");
const a: string = "str";
const a: string = `str`;
const a: string = String(1);
const a: symbol = Symbol("a");
const a: undefined = undefined;
const a: undefined = void someValue;

class Foo {
  prop: number = 5;
}

function fn(a: number = 5, b: boolean = true) {}
```

**Good**

```typescript
const a = 10n;
const a = -10n;
const a = BigInt(10);
const a = -BigInt(10);
const a = false;
const a = true;
const a = Boolean(null);
const a = !0;
const a = 10;
const a = +10;
const a = -10;
const a = Number("1");
const a = +Number("1");
const a = -Number("1");
const a = Infinity;
const a = +Infinity;
const a = -Infinity;
const a = NaN;
const a = +NaN;
const a = -NaN;
const a = null;
const a = /a/;
const a = RegExp("a");
const a = new RegExp("a");
const a = "str";
const a = `str`;
const a = String(1);
const a = Symbol("a");
const a = undefined;
const a = void someValue;

class Foo {
  prop = 5;
}

function fn(a = 5, b = true) {}

function fn(a: number, b: boolean, c: string) {}
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-inferrable-types": "error" }
```

### `void` Type

The `void` type means “nothing” or that a `function` does not `return` any value, in contrast with implicit `undefined` type which means that a `function` `return`s a value `undefined`. So “nothing” cannot be mixed with any other types, other than `never`, which accepts all types. If you need this - use the `undefined` type instead.

#### Example

**Bad**

```typescript
type PossibleValues = string | number | void;
type MorePossibleValues = string | ((number & any) | (string | void));

function logSomething(thing: void) {}
function printArg<T = void>(arg: T) {}

logAndReturn<void>(undefined);

interface Interface {
  lambda: () => void;
  prop: void;
}

class MyClass {
  private readonly propName: void;
}
```

**Good**

```typescript
type NoOp = () => void;

function noop(): void {}

let trulyUndefined = void 0;

async function promiseMeSomething(): Promise<void> {}

type stillVoid = void | never;
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-invalid-void-type": "error" }
```

### Namespaces

Custom TypeScript modules and `namespace` declarations are not a legacy way of creating modules. We recommend not using `namespace` and instead using `export` and `import` statements.

#### Example

**Bad**

```typescript
module foo {}
namespace foo {}

declare module foo {}
declare namespace foo {}
```

**Good**

```typescript
declare module "foo" {}

// anything inside a d.ts file
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-namespace": "error" }
```

### Non-null Assertions

We recommend not using non-null assertions. It cancels out the benefits of using strict null checking. If you're certain a value is not `null` or `undefined` - refine your typings to reflect that instead.

#### Example

**Bad**

```typescript
type Foo = {
  bar?: string;
};

const foo: Foo = getFoo();
const includesBaz = foo.bar!.includes("baz");
```

**Good**

```typescript
type Foo = {
  bar?: string;
};

const foo: Foo = getFoo();
const includesBaz = foo.bar?.includes("baz") ?? false;
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-non-null-assertion": "error" }
```

### Type Aliases

Some guides and rulesets discourage the use of type aliases. We recommend using them wherever it makes sense to do so, e.g.: clarifying the intent of a primitive. Their limitation is that when using `interface`s, they can't be `extend`ed when aliased to a `type`, however because we recommend using `type` instead of `interface`, this is a non-issue.

#### Example

```typescript
type Id = string;

type User = {
  id: Id;
  name: string;
};
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-type-alias": "off" }
```

### Unnecessary Type Assertion

Using type assertions where the produced type is the same type as the original one, is usually a mistake and can be safely removed. This usually happens when some pieces of code haven't been checked after a refactoring.

#### Example

**Bad**

```typescript
const foo = 3;
const bar = foo!;
const foo = <3>3;
type Foo = 3;
const foo = <Foo>3;
type Foo = 3;
const foo = 3 as Foo;
function foo(x: number): number {
  return x!; // unnecessary non-null
}
```

**Good**

```typescript
const foo = <number>3;
const foo = 3 as number;
const foo = "foo" as const;
function foo(x: number | undefined): number {
  return x!;
}
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-unnecessary-type-assertion": "error" }
```

### Unnecessary Type Constraints

Type parameters (`<T>`) may be "constrained" with an `extends` keyword ([docs](https://www.typescriptlang.org/docs/handbook/generics.html#generic-constraints)). When not provided, type parameters happen to default to:

- As of TypeScript 3.9: `unknown` ([docs](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#type-parameters-that-extend-any-no-longer-act-as-any))
- Before that, as of 3.5: `any` ([docs](https://devblogs.microsoft.com/typescript/announcing-typescript-3-5/#breaking-changes))

It is therefore redundant to extend from these types in later versions of TypeScript.

#### Example

**Bad**

```typescript
interface FooAny<T extends any> {}
interface FooUnknown<T extends unknown> {}

type BarAny<T extends any> = {};
type BarUnknown<T extends unknown> = {};

class BazAny<T extends any> {
  quxUnknown<U extends unknown>() {}
}

class BazUnknown<T extends unknown> {
  quxUnknown<U extends unknown>() {}
}

const QuuxAny = <T extends any>() => {};
const QuuxUnknown = <T extends unknown>() => {};

function QuuzAny<T extends any>() {}
function QuuzUnknown<T extends unknown>() {}
```

**Good**

```typescript
interface Foo<T> {}

type Bar<T> = {};

class Baz<T> {
    qux<U> { }
}

const Quux = <T>() => {};

function Quuz<T>() {}

```

#### ESLint Rule

```json
{ "@typescript-eslint/no-unnecessary-type-constraint": "error" }
```

### Calling Functions with `any`

Calling a `function` with `any` typed argument is not checked at all by TypeScript, so it creates a potential safety hole, and source of bugs in your codebase.

#### Example

**Bad**

```typescript
declare function foo(arg1: string, arg2: number, arg3: string): void;

const anyTyped = 1 as any;

foo(...anyTyped);
foo(anyTyped, 1, "a");

const anyArray: any[] = [];
foo(...anyArray);

const tuple1 = ["a", anyTyped, "b"] as const;
foo(...tuple1);

const tuple2 = [1] as const;
foo("a", ...tuple, anyTyped);

declare function bar(arg1: string, arg2: number, ...rest: string[]): void;
const x = [1, 2] as [number, ...number[]];
foo("a", ...x, anyTyped);

declare function baz(arg1: Set<string>, arg2: Map<string, string>): void;
foo(new Set<any>(), new Map<any, string>());
```

**Good**

```typescript
declare function foo(arg1: string, arg2: number, arg3: string): void;

foo("a", 1, "b");

const tuple1 = ["a", 1, "b"] as const;
foo(...tuple1);

declare function bar(arg1: string, arg2: number, ...rest: string[]): void;
const array: string[] = ["a"];
bar("a", 1, ...array);

declare function baz(arg1: Set<string>, arg2: Map<string, string>): void;
foo(new Set<string>(), new Map<string, string>());
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-unsafe-argument": "error" }
```

### Unsafe Assignments

Assigning an `any` typed value to a variable can be hard to pick up on, particularly if it leaks in from an external library. Operations on the variable will not be checked at all by TypeScript, so it creates a potential safety hole, and source of bugs in your codebase.

#### Example

**Bad**

```typescript
const x = 1 as any,
  y = 1 as any;
const [x] = 1 as any;
const [x] = [] as any[];
const [x] = [1 as any];
[x] = [1] as [any];

function foo(a = 1 as any) {}
class Foo {
  constructor(private a = 1 as any) {}
}
class Foo {
  private a = 1 as any;
}

// generic position examples
const x: Set<string> = new Set<any>();
const x: Map<string, string> = new Map<string, any>();
const x: Set<string[]> = new Set<any[]>();
const x: Set<Set<Set<string>>> = new Set<Set<Set<any>>>();
```

**Good**

```typescript
const x = 1,
  y = 1;
const [x] = [1];
[x] = [1] as [number];

function foo(a = 1) {}
class Foo {
  constructor(private a = 1) {}
}
class Foo {
  private a = 1;
}

// generic position examples
const x: Set<string> = new Set<string>();
const x: Map<string, string> = new Map<string, string>();
const x: Set<string[]> = new Set<string[]>();
const x: Set<Set<Set<string>>> = new Set<Set<Set<string>>>();
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-unsafe-assignment": "error" }
```

### Calling `any` Type

The arguments to, and return value of calling an `any` typed variable are not checked at all by TypeScript, so it creates a potential safety hole, and source of bugs in your codebase.

#### Example

**Bad**

```typescript
declare const anyVar: any;
declare const nestedAny: { prop: any };

anyVar();
anyVar.a.b();

nestedAny.prop();
nestedAny.prop["a"]();

new anyVar();
new nestedAny.prop();

anyVar`foo`;
nestedAny.prop`foo`;
```

**Good**

```typescript
declare const typedVar: () => void;
declare const typedNested: { prop: { a: () => void } };

typedVar();
typedNested.prop.a();

(() => {})();

new Map();

String.raw`foo`;
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-unsafe-call": "error" }
```

### Unsafe Member Access

Member access on any typed variables is not checked at all by TypeScript, so it creates a potential safety hole, and source of bugs in your codebase.

#### Example

**Bad**

```typescript
declare const anyVar: any;
declare const nestedAny: { prop: any };

anyVar.a;
anyVar.a.b;
anyVar["a"];
anyVar["a"]["b"];

nestedAny.prop.a;
nestedAny.prop["a"];

const key = "a";
nestedAny.prop[key];

// Using an any to access a member is unsafe
const arr = [1, 2, 3];
arr[anyVar];
nestedAny[anyVar];
```

**Good**

```typescript
declare const properlyTyped: { prop: { a: string } };

properlyTyped.prop.a;
properlyTyped.prop["a"];

const key = "a";
properlyTyped.prop[key];

const arr = [1, 2, 3];
arr[1];
const idx = 1;
arr[idx];
arr[idx++];
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-unsafe-member-access": "error" }
```

### Unsafe Return

Returned `any` typed values are not checked at all by TypeScript, so it creates a potential safety hole, and source of bugs in your codebase.

#### Example

**Bad**

```typescript
function foo1() {
  return 1 as any;
}
function foo2() {
  return Object.create(null);
}
const foo3 = () => {
  return 1 as any;
};
const foo4 = () => Object.create(null);

function foo5() {
  return [] as any[];
}
function foo6() {
  return [] as Array<any>;
}
function foo7() {
  return [] as readonly any[];
}
function foo8() {
  return [] as Readonly<any[]>;
}
const foo9 = () => {
  return [] as any[];
};
const foo10 = () => [] as any[];

const foo11 = (): string[] => [1, 2, 3] as any[];

// generic position examples
function assignability1(): Set<string> {
  return new Set<any>([1]);
}
type TAssign = () => Set<string>;
const assignability2: TAssign = () => new Set<any>([true]);
```

**Good**

```typescript
function foo1() {
  return 1;
}
function foo2() {
  return Object.create(null) as Record<string, unknown>;
}

const foo3 = () => [];
const foo4 = () => ["a"];

function assignability1(): Set<string> {
  return new Set<string>(["foo"]);
}
type TAssign = () => Set<string>;
const assignability2: TAssign = () => new Set(["foo"]);
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-unsafe-return": "error" }
```

### `as const` vs Literal Type

Using `const` assertion vs defining a literal type can save you some type, especially when extending shapes of objects in an expanding codebase.

#### Example

**Bad**

```typescript
let bar: 2 = 2;
let foo = <"bar">"bar";
let foo = { bar: "baz" as "baz" };
```

**Good**

```typescript
let foo = "bar";
let foo = "bar" as const;
let foo: "bar" = "bar" as const;
let bar = "bar" as string;
let foo = { bar: "baz" };
```

#### ESLint Rule

```json
{ "@typescript-eslint/prefer-as-const": "error" }
```

### Union Type Member Sorting

We recommend orting union (`|`) and intersection (`&`), because it can help:

- keep your codebase standardized
- find repeated types
- reduce diff churn
- avoid merge conflicts

#### Example

**Bad**

```typescript
type T1 = B | A;

type T2 = { b: string } & { a: string };

type T3 = [1, 2, 4] & [1, 2, 3];

type T4 =
  | [1, 2, 4]
  | [1, 2, 3]
  | { b: string }
  | { a: string }
  | (() => void)
  | (() => string)
  | "b"
  | "a"
  | "b"
  | "a"
  | readonly string[]
  | readonly number[]
  | string[]
  | number[]
  | B
  | A
  | string
  | any;
```

**Good**

```typescript
type T1 = A | B;

type T2 = { a: string } & { b: string };

type T3 = [1, 2, 3] & [1, 2, 4];

type T4 =
  | any
  | string
  | A
  | B
  | number[]
  | string[]
  | readonly number[]
  | readonly string[]
  | "a"
  | "b"
  | "a"
  | "b"
  | (() => string)
  | (() => void)
  | { a: string }
  | { b: string }
  | [1, 2, 3]
  | [1, 2, 4];
```

#### ESLint Rule

```json
{ "@typescript-eslint/sort-type-union-intersection-members": "error" }
```

### Triple Slash Reference

Use of triple-slash reference type directives is discouraged in favor of the newer import style. This rule allows you to ban use of `/// <reference path="" />`, `/// <reference types="" />`, or `/// <reference lib="" />` directives.

#### Example

**Bad**

```typescript
/// <reference path="foo" />
/// <reference types="bar" />
/// <reference lib="baz" />
```

**Good**

```typescript
import * as foo from "foo";
```

#### ESLint Rule

```json
{ "@typescript-eslint/triple-slash-reference": "error" }
```

### Unified Signature

Sometimes it is possible to replace a `function` signature overload with a `type` union. This method is preferred as it reduces clutter and better expresses the different types that a function may be called with in one place.

#### Example

**Bad**

```typescript
function x(x: number): void;
function x(x: string): void;
function y(): void;
function y(...x: number[]): void;
```

**Good**

```typescript
function x(x: number | string): void;
function y(...x: number[]): void;
```

#### ESLint Rule

```json
{ "@typescript-eslint/unified-signatures": "error" }
```

<!-- end Types -->

## Classes

### Exposing Class Fields

When writing TypeScript applications, it's typically safe to store literal values on classes using fields with the `readonly` modifier to prevent them from being reassigned. When writing TypeScript libraries that could be used by JavaScript users however, it's typically safer to expose these literals using getters, since the `readonly` modifier is enforced at compile type.

#### Example

**Bad**

```typescript
class Mx {
  public static get myField1() {
    return 1;
  }

  private get ["myField2"]() {
    return "hello world";
  }
}
```

**Good**

```typescript
class Mx {
  public readonly myField1 = 1;

  // not a literal
  public readonly myField2 = [1, 2, 3];

  private readonly ["myField3"] = "hello world";

  public get myField4() {
    return `hello from ${window.location.href}`;
  }
}
```

#### ESLint Rule

```json
{ "@typescript-eslint/class-literal-property-style": ["error", "fields"] }
```

### Classes as Namespaces

It is common practice to use classes as namespaces. We do not recommend this, because it's not what classes are meant to be used for. It also stops a compiler from being able to carry out optimisations, such as treeshaking.

#### Example

**Bad**

```typescript
class EmptyClass {}

class ConstructorOnly {
  constructor() {
    foo();
  }
}

// Use an object instead:
class StaticOnly {
  static version = 42;
  static hello() {
    console.log("Hello, world!");
  }
}
```

**Good**

```typescript
class EmptyClass extends SuperClass {}

class ParameterProperties {
  constructor(public name: string) {}
}

const StaticOnly = {
  version: 42,
  hello() {
    console.log("Hello, world!");
  },
};
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-extraneous-class": "error" }
```

### Misused `new`

Misuse of `new` keyword in `class` and `interface` defintions is most likely a mistake and should be avoided to keep the code sane and understandable.

#### Example

**Bad**

```typescript
class C {
  new(): C;
}

interface I {
  new (): I;
  constructor(): void;
}
```

**Good**

```typescript
class C {
  constructor() {}
}
interface I {
  new (): C;
}
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-misused-new": "error" }
```

<!-- end Classes -->

## Variables

### Naming Conventions

We recommend keeping a strict naming convention for variables. This is to reduce decisions needed to be made when doing the most difficult job a programmer has to do: naming variables.

#### Example

**Bad**

```typescript
const MyVariable = 1;
let another_variable = "hello world";
let FAKE_CONSTANT = "hello world";
const myBoolean = true;
```

**Good**

```typescript
const myVariable = 1;
let anotherVariable = "hello world";
const A_CONSTANT = "hello world";
const isMyBoolean = true;
```

#### ESLint Rule

```json
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": ["default"],
      "format": ["camelCase"],
      "leadingUnderscore": "allow",
      "trailingUnderscore": "allow"
    },
    {
      "selector": "function",
      "format": ["PascalCase", "camelCase"]
    },
    {
      "selector": ["variable"],
      "format": ["camelCase", "UPPER_CASE"]
    },
    {
      "selector": ["variable"],
      "modifiers": ["const"],
      "format": ["camelCase", "UPPER_CASE"]
    },
    {
      "selector": ["variable"],
      "types": ["boolean"],
      "format": ["camelCase"],
      "prefix": ["is", "has", "was", "had"]
    },
    {
      "selector": ["typeLike"],
      "format": ["PascalCase"]
    }
  ]
}
```

<!-- end Variables -->

## Iteration

### `for in` for Arrays

A `for-in` loop (`for (var k in o)`) iterates over the properties of an Object. While it is legal to use for-in loops with array types, it is not common. for-in will iterate over the indices of the array as strings, omitting any "holes" in the array. More common is to use for-of, which iterates over the values of an array. If you want to iterate over the indices, alternatives include:

```typescript
array.forEach((value, index) => {
  /* ... */
});
for (const [index, value] of array.entries()) {
  /* ... */
}
for (let i = 0; i < array.length; i++) {
  /* ... */
}
```

#### Example

**Bad**

```typescript
for (const x in [3, 4, 5]) {
  console.log(x);
}
```

**Good**

```typescript
for (const x in { a: 3, b: 4, c: 5 }) {
  console.log(x);
}
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-for-in-array": "error" }
```

## Operators

### `void` Operator

We recommend not using the `void` operator at all. It's used to indicate that a value should be discarded. It can sometimes be useful to use it to explicitly discard of a value, however, using it when a value is already `undefined` is discouraged.

#### Example

**Bad**

```typescript
void (() => {})();

function foo() {}
void foo();
```

**Good**

```typescript
(() => {})();

function foo() {}
foo(); // nothing to discard

function bar(x: number) {
  void x; // discarding a number
  return 2;
}
void bar(); // discarding a number
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-meaningless-void-operator": "error" }
```

## Modules

### `require()`

We recommend not using `require` to import dependencies. `import` is the preferred alternative. `require` has a different runtime behavior than `import` and is not guaranteed to be available in all environments, such as ES6+ modules. Some tools may not be able to statically analyze `require`d modules, due to how `require` can be used dynamically.

#### Example

**Bad**

```typescript
var lib = require("lib");
let lib2 = require("lib2");
var lib5 = require("lib5"),
  lib6 = require("lib6");
import lib8 = require("lib8");
```

**Good**

```typescript
import { l } from "lib";
var lib3 = load("not_an_import");
var lib4 = lib2.subImport;
var lib7 = 700;
import lib9 = lib2.anotherSubImport;
import lib10 from "lib10";
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-require-imports": "error" }
```

<!-- end Modules -->

## Flow Control

### Unnecessary Equality Comparison of Booleans

Comparing boolean values to boolean literals is unnecessary, those comparisons result in the same booleans. Using the boolean values directly, or via a unary negation (`!value`), is more concise and clearer.

#### Example

**Bad**

```typescript
const someBoolean = true;
if (someBoolean === true) {
  // ...
}
```

**Good**

```typescript
const someBoolean = true;
if (someBoolean) {
  // ...
}
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error" }
```

### Unnecessary Conditions

Any expression being used as a condition must be able to evaluate as truthy or falsy in order to be considered "necessary". Conversely, any expression that always evaluates to truthy or always evaluates to falsy, as determined by the type of the expression, is considered unnecessary. These expressions are usually a result of a mistake in the code, and should be fixed.

#### Example

**Bad**

```typescript
function head<T>(items: T[]) {
  // items can never be nullable, so this is unnecessary
  if (items) {
    return items[0].toUpperCase();
  }
}

function foo(arg: "bar" | "baz") {
  // arg is never nullable or empty string, so this is unnecessary
  if (arg) {
  }
}

function bar<T>(arg: string) {
  // arg can never be nullish, so ?. is unnecessary
  return arg?.length;
}

// Checks array predicate return types, where possible
[
  [1, 2],
  [3, 4],
].filter((t) => t); // number[] is always truthy
```

**Good**

```typescript
function head<T>(items: T[]) {
  // Necessary, since items.length might be 0
  if (items.length) {
    return items[0].toUpperCase();
  }
}

function foo(arg: string) {
  // Necessary, since foo might be ''.
  if (arg) {
  }
}

function bar(arg?: string | null) {
  // Necessary, since arg might be nullish
  return arg?.length;
}

[0, 1, 2, 3].filter((t) => t); // number can be truthy or falsy
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-unnecessary-condition": "error" }
```

### Nullish Coalescing Operator

TypeScript 3.7 added support for the nullish coalescing operator. This operator allows you to safely cascade a value when dealing with `null` or `undefined`.

Because the nullish coalescing operator only coalesces when the original value is `null` or `undefined`, it is much safer than relying upon logical OR operator chaining `||`; which coalesces on any falsy value:

#### Example

**Bad**

```typescript
const emptyString = "";

const logical1 = emptyString || "unsafe";

declare const nullString: string | null;

const logical2 = nullString || "safe";
```

**Good**

```typescript
const emptyString = "";

const nullish1 = emptyString ?? "unsafe";

declare const nullString: string | null;

const nullish2 = nullString ?? "safe";
```

#### ESLint Rule

```json
{ "@typescript-eslint/prefer-nullish-coalescing": "error" }
```

### Optional Chaining

TypeScript 3.7 added support for the optional chain operator. This operator allows you to safely access properties and methods on objects when they are potentially `null` or `undefined`.

Using this operator is preferred over the more verbose alternative of logical AND operator chaining (`&&`).

#### Example

**Bad**

```typescript
foo && foo.a && foo.a.b && foo.a.b.c;
foo && foo["a"] && foo["a"].b && foo["a"].b.c;
foo && foo.a && foo.a.b && foo.a.b.method && foo.a.b.method();

foo &&
  foo.a != null &&
  foo.a.b !== null &&
  foo.a.b.c != undefined &&
  foo.a.b.c.d !== undefined &&
  foo.a.b.c.d.e;
```

**Good**

```typescript
foo?.a?.b?.c;
foo?.["a"]?.b?.c;
foo?.a?.b?.method?.();

foo?.a?.b?.c?.d?.e;
```

#### ESLint Rule

```json
{ "@typescript-eslint/prefer-optional-chain": "error" }
```

### Exhausting Switch Statements

A union type may have a lot of parts. It's easy to forget to consider all cases in `switch` statements. If domain of the problem requires to have only a partial switch, developer may explicitly add a default clause.

#### Example

**Bad**

```typescript
type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

const day = "Monday" as Day;
let result = 0;

switch (day) {
  case "Monday": {
    result = 1;
    break;
  }
}
```

**Good**

```typescript
type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

const day = "Monday" as Day;
let result = 0;

switch (day) {
  case "Monday": {
    result = 1;
    break;
  }
  case "Tuesday": {
    result = 2;
    break;
  }
  case "Wednesday": {
    result = 3;
    break;
  }
  case "Thursday": {
    result = 4;
    break;
  }
  case "Friday": {
    result = 5;
    break;
  }
  case "Saturday": {
    result = 6;
    break;
  }
  case "Sunday": {
    result = 7;
    break;
  }
}
```

#### ESLint Rule

```json
{ "@typescript-eslint/switch-exhaustiveness-check": "error" }
```

<!-- end Flow Control -->

## Arrays

### `includes` Method Over `indexOf`

Until ES5, we were using `String#indexOf` method to check whether a string contains an arbitrary substring or not. Until ES2015, we were using `Array#indexOf` method to check whether an array contains an arbitrary value or not.

ES2015 has added `String#includes` and ES2016 has added `Array#includes`. It makes code more understandable if we use those includes methods for the purpose.

#### Example

**Bad**

```typescript
let str: string;
let array: any[];
let readonlyArray: ReadonlyArray<any>;
let typedArray: UInt8Array;
let maybe: string;
let userDefined: {
  indexOf(x: any): number;
  includes(x: any): boolean;
};

str.indexOf(value) !== -1;
array.indexOf(value) !== -1;
readonlyArray.indexOf(value) === -1;
typedArray.indexOf(value) > -1;
maybe?.indexOf("") !== -1;
userDefined.indexOf(value) >= 0;

// simple RegExp test
/foo/.test(str);
```

**Good**

```typescript
let array: any[];
let readonlyArray: ReadonlyArray<any>;
let typedArray: UInt8Array;
let userDefined: {
  indexOf(x: any): number;
  includes(x: any): boolean;
};
let mismatchExample: {
  indexOf(x: any, fromIndex?: number): number;
  includes(x: any): boolean;
};

str.includes(value);
array.includes(value);
readonlyArray.includes(value);
typedArray.includes(value);
userDefined.includes(value);

// the two methods have different parameters.
mismatchExample.indexOf(value) >= 0;
```

#### ESLint Rule

```json
{ "@typescript-eslint/prefer-includes": "error" }
```

### Use `reduce` with a Type Parameter

It's common to call `Array#reduce` with a generic type, such as an array or object, as the initial value. Since these values are empty, their types are not usable:

- `[]` has type `never[]`, which can't have items pushed into it as nothing is type `never`
- `{}` has type `{}`, which doesn't have an index signature and so can't have properties added to it

A common solution to this problem is to cast the initial value. While this will work, it's not the most optimal solution as casting has subtle effects on the underlying types that can allow bugs to slip in.

A better (and lesser known) solution is to pass the type in as a generic parameter to `Array#reduce` explicitly. This means that TypeScript doesn't have to try to infer the type, and avoids the common pitfalls that come with casting.

#### Example

**Bad**

```typescript
[1, 2, 3].reduce((arr, num) => arr.concat(num * 2), [] as number[]);

["a", "b"].reduce(
  (accum, name) => ({
    ...accum,
    [name]: true,
  }),
  {} as Record<string, boolean>
);
```

**Good**

```typescript
[1, 2, 3].reduce<number[]>((arr, num) => arr.concat(num * 2), []);

["a", "b"].reduce<Record<string, boolean>>(
  (accum, name) => ({
    ...accum,
    [name]: true,
  }),
  {}
);
```

#### ESLint Rule

```json
{ "@typescript-eslint/prefer-reduce-type-parameter": "error" }
```

<!-- end Arrays -->

## Strings

### `exec` Over `match`

As `String#match` is defined to be the same as `RegExp#exec` when the regular expression does not include the g flag, prefer a consistent usage.

Using `exec` is preferred to enforce consistent usage.

> NOTE: `RegExp#exec` may also be slightly faster than `String#match`; this is the reason to choose it as the preferred usage.

#### Example

**Bad**

```typescript
"something".match(/thing/);

"some things are just things".match(/thing/);

const text = "something";
const search = /thing/;
text.match(search);
```

**Good**

```typescript
/thing/.exec("something");

"some things are just things".match(/thing/g);

const text = "something";
const search = /thing/;
search.exec(text);
```

#### ESLint Rule

```json
{ "@typescript-eslint/prefer-regexp-exec": "error" }
```

### `startsWith` and `endsWith`

There are multiple ways to verify if a string starts or ends with a specific string, such as `foo.indexOf('bar') === 0` or using a regular expression.

Since ES2015 has added `String#startsWith` and `String#endsWith`, this rule reports other ways to be consistent.

#### Example

**Bad**

```typescript
let foo: string;

// starts with
foo[0] === "b";
foo.charAt(0) === "b";
foo.indexOf("bar") === 0;
foo.slice(0, 3) === "bar";
foo.substring(0, 3) === "bar";
foo.match(/^bar/) != null;
/^bar/.test(foo);

// ends with
foo[foo.length - 1] === "b";
foo.charAt(foo.length - 1) === "b";
foo.lastIndexOf("bar") === foo.length - 3;
foo.slice(-3) === "bar";
foo.substring(foo.length - 3) === "bar";
foo.match(/bar$/) != null;
/bar$/.test(foo);
```

**Good**

```typescript
foo.startsWith("bar");
foo.endsWith("bar");
```

#### ESLint Rule

```json
{ "@typescript-eslint/prefer-string-starts-ends-with": "error" }
```

### Template Literal Expression Type

You can pass in any value in template string expression, however passing in some values, such as objects may produce unexpected results.

We recommend only passing in `string`s, `number`s and `boolean`s, because their `string` representation matches how you read their values.

#### Example

**Bad**

```typescript
const arg1 = [1, 2];
const msg1 = `arg1 = ${arg1}`;

const arg2 = { name: "Foo" };
const msg2 = `arg2 = ${arg2 || null}`;
```

**Good**

```typescript
const arg = "foo";
const msg1 = `arg = ${arg}`;
const msg2 = `arg = ${arg || "default"}`;

const stringWithKindProp: string & { _kind?: "MyString" } = "foo";
const msg3 = `stringWithKindProp = ${stringWithKindProp}`;
```

#### ESLint Rule

```json
{
  "@typescript-eslint/restrict-template-expressions": [
    "error",
    {
      "allowNumber": true,
      "allowBoolean": true,
      "allowAny": false,
      "allowNullish": false,
      "allowRegExp": false
    }
  ]
}
```

<!-- end Strings -->

## Miscelaneous

### TS Comment

It is possible to control the behaviour of the TS compiler by using special comments in the code.
Doing so is discouraged, because most of the time this is done to get around providing proper typings or taking the time to cover a specific case.

This rule allows adding `@ts-expect-error` and `@ts-ignore` comments to the code, given that there's also a description that documents why such check should be bypassed. It is up to the developers reviewing the changes to justify if the reason in the comment is good enough to be ignored.

#### Example

**Bad**

```typescript
if (false) {
  // @ts-ignore
  console.log("this never happens");
}
```

**Good**

```typescript
it("throws an error with unsuitable input", () => {
  expect(() => {
    // @ts-expect-error: non-TS users should be able to trigger this case
    stringToNumber(123);
  }).toThrow();
});
```

#### ESLint Rule

```json
{
  "@typescript-eslint/ban-ts-comment": [
    "error",
    {
      "ts-expect-error": "allow-with-description",
      "ts-ignore": "allow-with-description",
      "ts-nocheck": true,
      "ts-check": true,
      "minimumDescriptionLength": 10
    }
  ]
}
```

### Void Expressions

Returning the results of an expression whose type is void can be misleading. Attempting to do so is likely a symptom of expecting a different return type from a function. Even if used correctly, it can be misleading for other developers, who don't know what a particular function does and if its result matters.

#### Example

**Bad**

```typescript
// somebody forgot that `alert` doesn't return anything
const response = alert("Are you sure?");
console.log(alert("Are you sure?"));

// it's not obvious whether the chained promise will contain the response (fixable)
promise.then((value) => window.postMessage(value));

// it looks like we are returning the result of `console.error` (fixable)
function doSomething() {
  if (!somethingToDo) {
    return console.error("Nothing to do!");
  }

  console.log("Doing a thing...");
}
```

**Good**

```typescript
// just a regular void function in a statement position
alert("Hello, world!");

// this function returns a boolean value so it's ok
const response = confirm("Are you sure?");
console.log(confirm("Are you sure?"));

// now it's obvious that `postMessage` doesn't return any response
promise.then((value) => {
  window.postMessage(value);
});

// now it's explicit that we want to log the error and return early
function doSomething() {
  if (!somethingToDo) {
    console.error("Nothing to do!");
    return;
  }

  console.log("Doing a thing...");
}

// using logical expressions for their side effects is fine
cond && console.log("true");
cond || console.error("false");
cond ? console.log("true") : console.error("false");
```

#### ESLint Rule

```json
{
  "@typescript-eslint/no-confusing-void-expression": [
    "error",
    { "ignoreArrowShorthand": true }
  ]
}
```

### Delete Operator with Dynamic Keys

Using the delete operator on keys that aren't runtime constants could be a sign that you're using the wrong data structures. Using Objects with added and removed keys can cause occasional edge case bugs, such as if a key is named "hasOwnProperty". Consider using a Map or Set if you’re storing collections of objects.

#### Example

**Bad**

```typescript
// Can be replaced with the constant equivalents, such as container.aaa
delete container["aaa"];
delete container["Infinity"];

// Dynamic, difficult-to-reason-about lookups
const name = "name";
delete container[name];
delete container[name.toUpperCase()];
```

**Good**

```typescript
const container: { [i: string]: number } = {
  /* ... */
};

// Constant runtime lookups by string index
delete container.aaa;

// Constants that must be accessed by []
delete container[7];
delete container["-Infinity"];
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-dynamic-delete": "error" }
```

### `this` Alias

Before arrow functions, a popular way of referencing the lexical scope inside of a callback `function` is to use the following gem:

```javascript
var self = this;
```

This is no longer required and storing references of `this` may be a symptom of insufficient knowledge of scopes.

#### Example

**Bad**

```typescript
const self = this;

setTimeout(function () {
  self.doWork();
});
```

**Good**

```typescript
setTimeout(() => {
  this.doWork();
});
```

#### ESLint Rule

```json
{ "@typescript-eslint/no-this-alias": "error" }
```

<!-- end Miscelaneous -->
