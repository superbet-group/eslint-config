---
title: Node.JS Import Rules
description: Rules regarding imports specific to a Node.JS codebase.
tags:
  - eslint
  - programming
  - best practices
  - guidelines
  - node.js
---

# Node.JS Import Rules

## No Node.JS Modules

This rule is in place to avoid situations when an IDE can resolve Node.JS built in modules and recommends them instead of installed dependencies. It needs to be turned off for Node.JS codebases.

### ESLint Rule

```json
{ "import/no-nodejs-modules": "off" }
```
