---
title: Node.JS Rules
description: Best practices for writing applications with Node.JS and TypeScript.
tags:
  - eslint
  - programming
  - best practices
  - guidelines
  - typescript
  - node.js
---

# Node.JS Rules

## Imports

In non-Node.JS codebases it is recommended to use the `import` keyword instead of `require` to import modules. In a pure Node.JS codebase, this rule is not required, because `require` will behave as expected.

It is still recommended to use TypeScript's `import foo = require("foo")` syntax, because it is more expressive.

### Example

**Bad**

```typescript
var fs = require("fs");
```

**Good**

```typescript
import fs = require("fs");
```

### ESLint Rule

```json
{
  "@typescript-eslint/no-require-imports": "off",
  "@typescript-eslint/no-var-requires": "error"
}
```
