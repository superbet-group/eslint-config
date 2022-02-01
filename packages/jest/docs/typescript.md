---
title: TypeScript Jest Rules
description: Rules that are specific to TypeScript and Jest.
tags:
  - eslint
  - programming
  - best practices
  - guidelines
  - jest
  - testing
  - typescript
---

# TypeScript Jest Rules

These rules are only necessary if `@typescript-eslint/eslint-plugin` is installed.

## `@ts-expect-error` instead of `@ts-ignore`

TypeScript allows you to suppress all errors on a line by placing a single-line comment or a comment block line starting with `@ts-ignore` immediately before the erroring line. While powerful, there is no way to know if a `@ts-ignore` is actually suppressing an error without manually investigating what happens when the `@ts-ignore` is removed.

Not all codebases will consume your library using TypeScript, so it always makes sense to add tests for errors that would be caught by TypeScript.

To express that you're expected these errors, use `@ts-expect-error` instead of `@ts-ignore`.

### ESLint Rule

> NOTE: do not use `@ts-expect-error` in code you ship to clients. That's just asking for trouble.

```json
{ "@typescript-eslint/prefer-ts-expect-error": "error" }
```
