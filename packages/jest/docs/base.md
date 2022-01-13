---
title: Jest Rules
description: Best practices for testing with Jest.
tags:
  - eslint
  - programming
  - best practices
  - guidelines
  - jest
  - testing
---

# Testing with Jest

Jest is a natural choice for testing JavaScript and TypeScript codebases due to its simplicity, ease of use and wide ecosystem. It is compatible with both Node.js and browsers and has utilities for testing a wide array of frontend technologies, such as React.

## Naming Your Tests

We recommend using the fluent naming convention for your tests. This means that both your tests and the produced result should be easy to read and formatted in a human-readable, grammatically correct way.

### Example

```js
import { power } from "math";

describe("exports `power` function, that", () => {
  it("returns the power of a number, given a number and the power", () => {
    expect(power(2, 3)).toBe(8);
  });

  it("returns 1, given the power argument is 0", () => {
    expect(power(2, 0)).toBe(1);
  });
});
```

This produces the following result:

```bash
[PASS] ./math.test.ts
  exports `power` function, that
    ✓ returns the power of a number, given a number and the power
    ✓ returns 1, given the power argument is 0
```

Most reporters will be able to extract results such as this:

```text
[./math.test.ts] exports `power` function, that, returns the power of a number, given a number and the power
[./math.test.ts] exports `power` function, that, returns 1, given the power argument is 0
```

This is easy to read and understand and can help non-technical people understand the tests, should they have to evaluate the importance of fixing them at some point.

## `it` vs `test`

`it` and `test` can be used interchangeably. We recommend always using `test` for top-level tests, while only using `it` for tests that are inside a `describe` block.

### Example

**Bad**

```typescript
it("true is true", () => {
  expect(true).toBe(true);
});

describe("within the describe block", () => {
  test("true is still true", () => {
    expect(true).toBe(true);
  });
});
```

**Good**

```typescript
test("true is true", () => {
  expect(true).toBe(true);
});

describe("within the describe block", () => {
  it("true is still true", () => {
    expect(true).toBe(true);
  });
});
```

### ESLint Rule

```json
{ "consistent-test-it": ["error", { "fn": "test", "withinDescribe": "it" }] }
```

## Making Assertions

Tests that do not have assertions (functions that throw an error if a given condition is not met) will most likely pass against the wishes of the developer. This is most likely an indication of an incomplete tests.

### Example

**Bad**

```typescript
it("should be a test", () => {
  console.log("no assertion");
});
test("should assert something", () => {});
```

**Good**

```typescript
it("should be a test", () => {
  expect(true).toBeDefined();
});
it("should work with callbacks/async", () => {
  somePromise().then((res) => expect(res).toBe("passed"));
});
```

### ESLint Rule

```json
{ "expect-expect": "error" }
```

## Nesting `describe` Blocks

While it is sometimes useful to nest `describe` blocks, to step into deeper levels of testing, it is not recommended to go deeper than 3 levels. This is because it greatly reduces readability of your code and is also an indication that the tests are not well-organized and are possibly testing implementation rather than function.

### Example

**Bad**

```typescript
describe("foo", () => {
  describe("bar", () => {
    describe("baz", () => {
      describe("qux", () => {
        describe("quxx", () => {
          describe("too many", () => {
            it("should get something", () => {
              expect(getSomething()).toBe("Something");
            });
          });
        });
      });
    });
  });
});
```

**Good**

```typescript
describe("foo", () => {
  describe("bar", () => {
    it("should get something", () => {
      expect(getSomething()).toBe("Something");
    });
  });
});
```

### ESLint Rule

```json
{ "max-nested-describe": ["error", { "max": 3 }] }
```

## Using Alias Methods

Several Jest methods have alias names, such as `toThrow` having the alias of `toThrowError`. This rule ensures that only the canonical name as used in the Jest documentation is used in the code. This makes it easier to search for all occurrences of the method within code, and it ensures consistency among the method names used.

### Example

**Bad**

```typescript
expect(a).toBeCalled();
expect(a).toBeCalledTimes();
expect(a).toBeCalledWith();
expect(a).lastCalledWith();
expect(a).nthCalledWith();
expect(a).toReturn();
expect(a).toReturnTimes();
expect(a).toReturnWith();
expect(a).lastReturnedWith();
expect(a).nthReturnedWith();
expect(a).toThrowError();
```

**Good**

```typescript
expect(a).toHaveBeenCalled();
expect(a).toHaveBeenCalledTimes();
expect(a).toHaveBeenCalledWith();
expect(a).toHaveBeenLastCalledWith();
expect(a).toHaveBeenNthCalledWith();
expect(a).toHaveReturned();
expect(a).toHaveReturnedTimes();
expect(a).toHaveReturnedWith();
expect(a).toHaveLastReturnedWith();
expect(a).toHaveNthReturnedWith();
expect(a).toThrow();
```

### ESLint Rule

```json
{ "no-alias-methods": "error" }
```

## Conditional `expect`

Jest only considers a test to have failed if it `throw`s an error, meaning if calls to assertion functions like `expect` occur in conditional code such as a `catch` statement, tests can end up passing but not actually test anything.

Additionally, conditionals tend to make tests more brittle and complex, as they increase the amount of mental thinking needed to understand what is actually being tested.

### Example

**Bad**

```typescript
it("foo", () => {
  doTest && expect(1).toBe(2);
});

it("bar", () => {
  if (!skipTest) {
    expect(1).toEqual(2);
  }
});

it("baz", async () => {
  try {
    await foo();
  } catch (err) {
    expect(err).toMatchObject({ code: "MODULE_NOT_FOUND" });
  }
});

it("throws an error", async () => {
  await foo().catch((error) => expect(error).toBeInstanceOf(error));
});
```

**Good**

```typescript
it("foo", () => {
  expect(!value).toBe(false);
});

function getValue() {
  if (process.env.FAIL) {
    return 1;
  }

  return 2;
}

it("foo", () => {
  expect(getValue()).toBe(2);
});

it("validates the request", () => {
  try {
    processRequest(request);
  } catch {
    // ignore errors
  } finally {
    expect(validRequest).toHaveBeenCalledWith(request);
  }
});

it("throws an error", async () => {
  await expect(foo).rejects.toThrow(Error);
});
```

### ESLint Rule

```json
{ "no-conditional-expect": "error" }
```

## Deprecated Functions

Over the years Jest has accrued some debt in the form of functions that have either been renamed for clarity, or replaced with more powerful APIs.

While typically these deprecated functions are kept in the codebase for a number of majors, eventually they are removed completely.

### `jest.resetModuleRegistry`

This function was renamed to `resetModules` in Jest 15, and is scheduled for
removal in Jest 27.

### `jest.addMatchers`

This function was replaced with `expect.extend` in Jest 17, and is scheduled for
removal in Jest 27.

### `require.requireActual` & `require.requireMock`

These functions were replaced in Jest 21 and removed in Jest 26.

Originally, the `requireActual` & `requireMock` the `requireActual`&
`requireMock` functions were placed onto the `require` function.

These functions were later moved onto the `jest` object in order to be easier
for type checkers to handle, and their use via `require` deprecated. Finally,
the release of Jest 26 saw them removed from the `require` function all
together.

### `jest.runTimersToTime`

This function was renamed to `advanceTimersByTime` in Jest 22, and is scheduled
for removal in Jest 27.

### `jest.genMockFromModule`

This function was renamed to `createMockFromModule` in Jest 26, and is scheduled
for removal in a future version of Jest.

### ESLint Rule

```json
{ "no-deprecated-functions": "error" }
```

## Skipping Tests

Jest has a feature that allows you to temporarily mark tests as disabled. This feature is often helpful while debugging or to create placeholders for future tests. Before committing changes we may want to check that all tests are running.

Skipping tests is a quick and dirty way around writing actual tests or fixing them when they are broken. This is not a good practice, and should be avoided.

### Example

**Bad**

```typescript
describe.skip("foo", () => {});
it.skip("foo", () => {});
test.skip("foo", () => {});

describe["skip"]("bar", () => {});
it["skip"]("bar", () => {});
test["skip"]("bar", () => {});

xdescribe("foo", () => {});
xit("foo", () => {});
xtest("foo", () => {});

it("bar");
test("bar");

it("foo", () => {
  pending();
});
```

**Good**

```typescript
describe("foo", () => {});
it("foo", () => {});
test("foo", () => {});

describe.only("bar", () => {});
it.only("bar", () => {});
test.only("bar", () => {});
```

### ESLint Rule

```json
{ "no-disabled-tests": "error" }
```

When calling asynchronous code in hooks and tests, jest needs to know when the asynchronous work is complete to progress the current run.

Originally the most common pattern to achieve this was to use callbacks:

```js
test("the data is peanut butter", (done) => {
  function callback(data) {
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

In non-ES6 environments it is possible to return a `Promise` from the callback:

```js
test("the data is peanut butter", () => {
  return fetchData().then((data) => {
    expect(data).toBe("peanut butter");
  });
});
```

When `async`/`await` is available, it's better to convert these tests to an `async` function:

```js
test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});
```

### ESLint Rule

```json
{ "no-done-callback": "error" }
```

## Duplicate Hooks

It is a common mistake to miss that a block already has a hook registered. This can cause unexpected behavior. To avoid this, it is best to organise hooks in order of running so that it's easy to see if one of them had already been used.

### Example

**Bad**

```typescript
describe("foo", () => {
  beforeEach(() => {
    // some setup
  });
  beforeEach(() => {
    // some setup
  });
  test("foo_test", () => {
    // some test
  });
});

// Nested describe scenario
describe("foo", () => {
  beforeEach(() => {
    // some setup
  });
  test("foo_test", () => {
    // some test
  });
  describe("bar", () => {
    test("bar_test", () => {
      afterAll(() => {
        // some teardown
      });
      afterAll(() => {
        // some teardown
      });
    });
  });
});
```

**Good**

```typescript
describe("foo", () => {
  beforeEach(() => {
    // some setup
  });
  test("foo_test", () => {
    // some test
  });
});

// Nested describe scenario
describe("foo", () => {
  beforeEach(() => {
    // some setup
  });
  test("foo_test", () => {
    // some test
  });
  describe("bar", () => {
    test("bar_test", () => {
      beforeEach(() => {
        // some setup
      });
    });
  });
});
```

### ESLint Rule

```json
{ "no-duplicate-hooks": "error" }
```

## No `export` from Tests

When writing tests, it is best to avoid exporting anything from the test file. If you import from a test file, then all the tests in that file will be run in each imported instance, so bottom line, don't export from a test, but instead move helper functions into a separate file when they need to be shared across tests.

### Example

**Bad**

```typescript
// a.test.js
export const myMockData = {};

describe("a test", () => {
  expect(doSomethingWithData(myMockData)).toBe(1);
});

// another.test.js - a.test.js tests will run again at this point
import { myMockData } from "./testFile";

describe("another test", () => {
  expect(myMockData).toStrictEqual({});
});
```

**Good**

```typescript
// mocks.js
export const myMockData = {};

// a.test.js
import { myMockData } from "./mocks";

describe("a test", () => {
  expect(doSomethingWithData(myMockData)).toBe(1);
});

// another.test.js
import { myMockData } from "./mocks";

describe("another test", () => {
  expect(myMockData).toStrictEqual({});
});
```

### ESLint Rule

```json
{ "no-export": "error" }
```

## Focused Tests

Jest has a feature that allows you to focus tests by appending `.only` or prepending `f` to a test-suite or a test-case. This feature is really helpful to debug a failing test, so you don’t have to execute all of your tests. After you have fixed your test and before committing the changes you have to remove `.only` to ensure all tests are executed on your build system.

Focused tests should never be commited to the repository as they stop other tests from running.

Make sure you remove focused tests before committing.

### Example

**Bad**

```typescript
describe.only("foo", () => {});
it.only("foo", () => {});
describe["only"]("bar", () => {});
it["only"]("bar", () => {});
test.only("foo", () => {});
test["only"]("bar", () => {});
fdescribe("foo", () => {});
fit("foo", () => {});
fit.each`
  table
`();
```

**Good**

```typescript
describe("foo", () => {});
it("foo", () => {});
describe.skip("bar", () => {});
it.skip("bar", () => {});
test("foo", () => {});
test.skip("bar", () => {});
it.each()();
it.each`
  table
`();
test.each()();
test.each`
  table
`();
```

### ESLint Rule

```json
{ "no-focused-tests": "error" }
```

## Identical Names

Having identical titles for two different tests or test suites may create confusion. For example, when a test with the same title as another test in the same test suite fails, it is harder to know which one failed and thus harder to fix.

### Example

**Bad**

```typescript
describe("foo", () => {
  it("should do bar", () => {});
  it("should do bar", () => {}); // Has the same title as the previous test

  describe("baz", () => {
    // ...
  });

  describe("baz", () => {
    // Has the same title as a previous test suite
    // ...
  });
});
```

**Good**

```typescript
describe("foo", () => {
  it("should do foo", () => {});
  it("should do bar", () => {});

  // Has the same name as a parent test suite, which is fine
  describe("foo", () => {
    // Has the same name as a test in a parent test suite, which is fine
    it("should do foo", () => {});
    it("should work", () => {});
  });

  describe("baz", () => {
    // Has the same title as a previous test suite
    // Has the same name as a test in a sibling test suite, which is fine
    it("should work", () => {});
  });
});
```

### ESLint Rule

```json
{ "no-identical-title": "error" }
```

## Conditions in Tests

Conditional logic in tests is usually an indication that a test is attempting to cover too much, and not testing the logic it intends to. Each branch of code executing within an if statement will usually be better served by a test devoted to it.

Conditionals are often used to satisfy the typescript type checker. In these cases, using the non-null assertion operator (`!`) would be best.

### Example

**Bad**

```typescript
it("foo", () => {
  if ("bar") {
    // an if statement here is invalid
    // you are probably testing too much
  }
});

it("foo", () => {
  const bar = foo ? "bar" : null;
});
```

**Good**

```typescript
it("foo", () => {
  // only test the 'foo' case
});

it("bar", () => {
  // test the 'bar' case separately
});

it("foo", () => {
  function foo(bar) {
    // nested functions are valid
    return foo ? bar : null;
  }
});
```

### ESLint Rule

```json
{ "no-if": "error" }
```

## Interpolation in Snapshots

Interpolation prevents snapshots from being updated. Instead, properties should be overloaded with a matcher by using property matchers.

### Example

**Bad**

```typescript
expect(something).toMatchInlineSnapshot(
  `Object {
    property: ${interpolated}
  }`
);

expect(something).toMatchInlineSnapshot(
  { other: expect.any(Number) },
  `Object {
    other: Any<Number>,
    property: ${interpolated}
  }`
);

expect(errorThrowingFunction).toThrowErrorMatchingInlineSnapshot(
  `${interpolated}`
);
```

**Good**

```typescript
expect(something).toMatchInlineSnapshot();

expect(something).toMatchInlineSnapshot(
  `Object {
    property: 1
  }`
);

expect(something).toMatchInlineSnapshot(
  { property: expect.any(Date) },
  `Object {
    property: Any<Date>
  }`
);

expect(errorThrowingFunction).toThrowErrorMatchingInlineSnapshot();

expect(errorThrowingFunction).toThrowErrorMatchingInlineSnapshot(
  `Error Message`
);
```

### ESLint Rule

```json
{ "no-interpolation-in-snapshots": "error" }
```

## Using Jasmine API

`jest` uses `jasmine` as a test runner. A side effect of this is that both a jasmine object, and some jasmine-specific globals, are exposed to the test environment. Most functionality offered by Jasmine has been ported to Jest, and the Jasmine globals will stop working in the future. Developers should therefore migrate to Jest's documented API instead of relying on the undocumented Jasmine API.

### Example

**Bad**

```typescript
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

test("my test", () => {
  pending();
});

test("my test", () => {
  fail();
});

test("my test", () => {
  spyOn(some, "object");
});

test("my test", () => {
  jasmine.createSpy();
});

test("my test", () => {
  expect("foo").toEqual(jasmine.anything());
});
```

**Good**

```typescript
jest.setTimeout(5000);

test("my test", () => {
  jest.spyOn(some, "object");
});

test("my test", () => {
  jest.fn();
});

test("my test", () => {
  expect("foo").toEqual(expect.anything());
});
```

### ESLint Rule

```json
{ "no-jasmine-globals": "error" }
```

## Importing `jest`

The `jest` object is automatically in scope within every test file. The methods in the `jest` object help create mocks and let you control Jest's overall behavior. It is therefore completely unnecessary to import in `jest`, as Jest doesn't export anything in the first place.

### Example

**Bad**

```typescript
var jest = require("jest");
const jest = require("jest");
import jest from "jest";
import { jest as test } from "jest";
```

**Good**

```typescript
jest.spyOn(some, "object");
```

### ESLint Rule

```json
{ "no-jest-import": "error" }
```

## Importing from `__mocks__`

When using jest.mock, your tests (just like the code being tested) should import from `./x`, not `./__mocks__/x`. Not following this rule can lead to confusion, because you will have multiple instances of the mocked module.

### Example

**Bad**

```typescript
import thing from "./__mocks__/index";
require("./__mocks__/index");
require("__mocks__");

jest.mock("./x");
const x1 = require("./x");
const x2 = require("./__mocks__/x");

test("x", () => {
  expect(x1).toBe(x2); // fails! They are both instances of `./__mocks__/x`, but not referentially equal
});
```

**Good**

```typescript
import thing from "./x";

test("x", () => {
  expect(thing).toBe(thing);
});
```

### ESLint Rule

```json
{ "no-mocks-import": "error" }
```

## `expect` Outside of Test Blocks

`expect` statements will not be executed when outside of test blocks. Doing so is most likely a mistake and should be avoided.

### Example

**Bad**

```typescript
describe("a test", () => {
  expect(1).toBe(1);
});

describe("a test", () => {
  it("an it", () => {
    expect(1).toBe(1);
  });

  expect(1).toBe(1);
});
```

**Good**

```typescript
describe("a test", () => {
  it("an it", () => {
    expect(1).toBe(1);
  });
});

describe("a test", () => {
  const helper = () => {
    expect(1).toBe(1);
  };

  it("an it", () => {
    helper();
  });
});

describe("a test", () => {
  expect.hasAssertions(1);
});
```

### ESLint Rule

```json
{ "no-standalone-expect": "error" }
```

## Argument Checking

It is possible to use `toHaveBeenCalled()` to quickly assert whether a function had been called or not. This misses an opportunity to also check what arguments the function was called with. It is recommended to always use `toHaveBeenCalledWith()` instead.

### Example

**Bad**

```typescript
expect(someFunction).toBeCalled();

expect(someFunction).toHaveBeenCalled();
```

**Good**

```typescript
expect(noArgsFunction).toHaveBeenCalledWith();

expect(roughArgsFunction).toHaveBeenCalledWith(
  expect.anything(),
  expect.any(Date)
);

expect(anyArgsFunction).toHaveBeenCalledTimes(1);

expect(uncalledFunction).not.toHaveBeenCalled();
```

### ESLint Rule

```json
{ "prefer-called-with": "error" }
```

## Checking Assertions

It is recommended, especially for `async` tests to check the number of assertions made inside of each test. This can help avoid some assertions not running due to race conditions and such.

### Example

**Bad**

```typescript
test("my test", async () => {
  const result = await someAsyncFunc();
  expect(result).toBe("foo");
});
```

**Good**

```typescript
test("my test", () => {
  const result = someFunction();
  expect(result).toBe("foo");
});

test("my test", async () => {
  expect.assertions(1);
  const result = await someAsyncFunc();
  expect(result).toBe("foo");
});
```

### ESLint Rule

> NOTE: The ESLint rule only enforces this for `async` tests, however it is recommended to use this for tests that include at least 3 assertions.

```json
{
  "prefer-expect-assertions": [
    "error",
    { "onlyFunctionsWithAsyncKeyword": true }
  ]
}
```

## Using `expect.resolves` Instead of `await` and `assert`

When working with promises, there are two primary ways you can test the resolved value:

1. Use the `resolve` modifier on `expect` (`await expect(...).resolves.<matcher>` style)
2. `await` the promise and assert against its result (`expect(await ...).<matcher>` style)

While the second style is arguably less dependent on `jest`, if the promise rejects it will be treated as a general error, resulting in less predictable behaviour and output from `jest`.

Additionally, favoring the first style ensures consistency with its `rejects` counterpart, as there is no way of "awaiting" a rejection.

### Example

**Bad**

```typescript
it("passes", async () => {
  expect(await someValue()).toBe(true);
});

it("is true", async () => {
  const myPromise = Promise.resolve(true);

  expect(await myPromise).toBe(true);
});
```

**Good**

```typescript
it("passes", async () => {
  await expect(someValue()).resolves.toBe(true);
});

it("is true", async () => {
  const myPromise = Promise.resolve(true);

  await expect(myPromise).resolves.toBe(true);
});

it("errors", async () => {
  await expect(Promise.rejects("oh noes!")).rejects.toThrow("oh noes!");
});
```

### ESLint Rule

```json
{ "prefer-expect-resolves": "error" }
```

## Hooks on Top

While hooks can be setup anywhere in a test file, they are always called in a specific order which means it can be confusing if they're intermixed with test cases.

### ESLint Rule

```json
{ "prefer-hooks-on-top": "error" }
```

## Using `spyOn` Instead of `jest.fn()`

When mocking a function by overwriting a property you have to manually restore the original implementation when cleaning up. When using `jest.spyOn()` Jest keeps track of changes, and they can be restored with `jest.restoreAllMocks()`, `mockFn.mockRestore()` or by setting `restoreMocks` to `true` in the Jest config.

> Note: The mock created by `jest.spyOn()` still behaves the same as the original function. The original function can be overwritten with `mockFn.mockImplementation()` or by some of the other mock functions.

### Example

**Bad**

```typescript
Date.now = jest.fn();
Date.now = jest.fn(() => 10);
```

**Good**

```typescript
jest.spyOn(Date, "now");
jest.spyOn(Date, "now").mockImplementation(() => 10);
```

### ESLint Rule

```json
{ "prefer-spy-on": "error" }
```

## Prefer `.toStrictEqual()`

`toStrictEqual` not only checks that two objects contain the same data but also that they have the same structure. It is common to expect objects to not only have identical values but also to have identical keys. A stricter equality will catch cases where two objects do not have identical keys.

### Example

**Bad**

```typescript
expect({ a: "a", b: undefined }).toEqual({ a: "a" }); // true
```

**Good**

```typescript
expect({ a: "a", b: undefined }).toStrictEqual({ a: "a" }); // false
```

### ESLint Rule

```json
{ "prefer-strict-equal": "error" }
```

## To Be or Not To Be

When asserting against primitive literals such as numbers and strings, the equality matchers all operate the same, but read slightly differently in code.

We recommend using `toBe` matchers in these situations because they read more clearly.

For `null`, `undefined`, and `NaN` we recommend using their specific `toBe` matchers.

### Example

**Bad**

```typescript
expect(value).not.toEqual(5);
expect(getMessage()).toStrictEqual("hello world");
expect(loadMessage()).resolves.toEqual("hello world");

expect(value).not.toBe(undefined);
expect(getMessage()).toBe(null);
expect(countMessages()).resolves.not.toBe(NaN);
```

**Good**

```typescript
expect(value).not.toBe(5);
expect(getMessage()).toBe("hello world");
expect(loadMessage()).resolves.toBe("hello world");
expect(didError).not.toBe(true);

expect(catchError()).toStrictEqual({ message: "oh noes!" });

expect(value).toBeDefined();
expect(getMessage()).toBeNull();
expect(countMessages()).resolves.not.toBeNaN();
```

### ESLint Rule

```json
{ "prefer-to-be": "error" }
```

## Testing for Containment

`jest` provides a handy way to test if an `array` contains a value. We recommend using this method instead of `array.includes()` or `array.indexOf()`.

### Example

**Bad**

```typescript
expect(a.includes(b)).toBe(true);
expect(a.includes(b)).not.toBe(true);
expect(a.includes(b)).toBe(false);
```

**Good**

```typescript
expect(a).toContain(b);

expect(a).not.toContain(b);
```

### ESLint Rule

```json
{ "prefer-to-contain": "error" }
```

## Testing for `length`

In order to have a better failure message, `toHaveLength()` should be used upon asserting expectations on objects length property.

### Example

**Bad**

```typescript
expect(files.length).toBe(1);
```

**Good**

```typescript
expect(files).toHaveLength(1);
```

### ESLint Rule

```json
{ "prefer-to-have-length": "error" }
```

## Empty Tests

We recommend using `todo` instead of `it` or `test` without a test body to indicate that a test is not yet implemented. This will show up in the test output.

### Example

**Bad**

```typescript
test("i need to write this test");
```

**Good**

```typescript
test.todo("i need to write this test");
```

### ESLint Rule

```json
{ "prefer-todo": "error" }
```

## Message for `toThrow`

When asserting errors, we recommend always using the parameter that allows you to assert the error message. This can catch false positive test results, where a different error had been thrown than expected.

### Example

**Bad**

```typescript
test("all the things", async () => {
  expect(() => a()).toThrow();

  expect(() => a()).toThrowError();

  await expect(a()).rejects.toThrow();

  await expect(a()).rejects.toThrowError();
});
```

**Good**

```typescript
test("all the things", async () => {
  expect(() => a()).toThrow("a");

  expect(() => a()).toThrowError("a");

  await expect(a()).rejects.toThrow("a");

  await expect(a()).rejects.toThrowError("a");
});
```

### ESLint Rule

```json
{ "require-to-throw-message": "error" }
```

## Valid `describe` Callback

Using an improper describe() callback function can lead to unexpected test errors.

Common errors are:

- `async` `describe` block
- `done` parameter to `describe` callback
- `return` statement in `describe` callback

### Example

**Bad**

```typescript
describe("myFunction()", async () => {
  // ...
});

describe("myFunction()", (done) => {
  // ...
});

//
describe("myFunction", () => {
  return Promise.resolve().then(() => {
    it("breaks", () => {
      throw new Error("Fail");
    });
  });
});

describe("myFunction", () =>
  it("returns a truthy value", () => {
    expect(myFunction()).toBeTruthy();
  }));
```

**Good**

```typescript
describe("myFunction()", () => {
  it("returns a truthy value", () => {
    expect(myFunction()).toBeTruthy();
  });
});
```

### ESLint Rule

```json
{ "valid-describe-callback": "error" }
```

## Valid `expect` Usage

Ensure `expect()` is called with a single argument and there is an actual expectation made.

It is also recommended to always `await` results of `async` expectations instead of `return`ing them.

### Example

**Bad**

```typescript
test("all the things", async () => {
  expect();
  expect().toEqual("something");
  expect("something", "else");
  expect("something");
  await expect("something");
  expect(true).toBeDefined;
  expect(Promise.resolve("hello")).resolves;
  expect(Promise.resolve("hello")).resolves.toEqual("hello");
  Promise.resolve(expect(Promise.resolve("hello")).resolves.toEqual("hello"));
  Promise.all([
    expect(Promise.resolve("hello")).resolves.toEqual("hello"),
    expect(Promise.resolve("hi")).resolves.toEqual("hi"),
  ]);

  return expect(Promise.resolve("hello")).resolves.toEqual("hello");
});
```

**Good**

```typescript
test("all the things", async () => {
  expect("something").toEqual("something");
  expect([1, 2, 3]).toEqual([1, 2, 3]);
  expect(true).toBeDefined();
  await expect(Promise.resolve("hello")).resolves.toEqual("hello");
  await Promise.resolve(
    expect(Promise.resolve("hello")).resolves.toEqual("hello")
  );
  await Promise.all(
    expect(Promise.resolve("hello")).resolves.toEqual("hello"),
    expect(Promise.resolve("hi")).resolves.toEqual("hi")
  );

  await expect(Promise.resolve("hello")).resolves.toEqual("hello");
});
```

### ESLint Rule

```json
{ "valid-expect": ["error", { "alwaysAwait": true }] }
```

## Promise Expectations

It is recommended to ensure that promises that include expectations are `return`ed or `await`ed, otherwise the expectation will not be evaluated.

### Example

**Bad**

```typescript
it("promises a person", () => {
  api.getPersonByName("bob").then((person) => {
    expect(person).toHaveProperty("name", "Bob");
  });
});

it("promises a counted person", () => {
  const promise = api.getPersonByName("bob").then((person) => {
    expect(person).toHaveProperty("name", "Bob");
  });

  promise.then(() => {
    expect(analytics.gottenPeopleCount).toBe(1);
  });
});

it("promises multiple people", () => {
  const firstPromise = api.getPersonByName("bob").then((person) => {
    expect(person).toHaveProperty("name", "Bob");
  });
  const secondPromise = api.getPersonByName("alice").then((person) => {
    expect(person).toHaveProperty("name", "Alice");
  });

  return Promise.any([firstPromise, secondPromise]);
});
```

**Good**

```typescript
it("promises a person", async () => {
  await api.getPersonByName("bob").then((person) => {
    expect(person).toHaveProperty("name", "Bob");
  });
});

it("promises a counted person", () => {
  let promise = api.getPersonByName("bob").then((person) => {
    expect(person).toHaveProperty("name", "Bob");
  });

  promise = promise.then(() => {
    expect(analytics.gottenPeopleCount).toBe(1);
  });

  return promise;
});

it("promises multiple people", () => {
  const firstPromise = api.getPersonByName("bob").then((person) => {
    expect(person).toHaveProperty("name", "Bob");
  });
  const secondPromise = api.getPersonByName("alice").then((person) => {
    expect(person).toHaveProperty("name", "Alice");
  });

  return Promise.allSettled([firstPromise, secondPromise]);
});
```

### ESLint Rule

```json
{ "valid-expect-in-promise": "error" }
```

## Valid Title

Titles should match the following criteria:

- not empty,
- is a string,
- not prefixed with their block name,
- have no leading or trailing spaces

### Example

**Bad**

```typescript
describe("", () => {});
describe("foo", () => {
  it("", () => {});
});
it("", () => {});
test("", () => {});
xdescribe("", () => {});
xit("", () => {});
xtest("", () => {});
```

**Good**

```typescript
describe("foo", () => {});
describe("foo", () => {
  it("bar", () => {});
});
test("foo", () => {});
it("foo", () => {});
xdescribe("foo", () => {});
xit("foo", () => {});
xtest("foo", () => {});
```

### ESLint Rule

```json
{ "valid-title": "error" }
```
