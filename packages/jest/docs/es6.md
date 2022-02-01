---
title: ES6+ Jest Rules
description: Rules that are specific to ES6+ and Jest.
tags:
  - eslint
  - programming
  - best practices
  - guidelines
  - jest
  - testing
  - es6
---

# ES6+ Jest Rules

## No Return

Tests in Jest should be `void` and not `return` values.

If you are returning Promises then you should update the test to use `async`/`await`.

### Example

**Bad**

```typescript
test("return an expect", () => {
  return expect(1).toBe(1);
});

it("returning a promise", function () {
  return new Promise((res) => setTimeout(res, 100)).then(() =>
    expect(1).toBe(1)
  );
});
```

**Good**

```typescript
it("noop", function () {});

test("noop", () => {});

test("one arrow", () => expect(1).toBe(1));

test("empty");

test("one", () => {
  expect(1).toBe(1);
});

it("one", function () {
  expect(1).toBe(1);
});

it("returning a promise", async () => {
  await new Promise((res) => setTimeout(res, 100));
  expect(1).toBe(1);
});
```

### ESLint Rule

```json
{ "no-test-return-statement": "error" }
```
