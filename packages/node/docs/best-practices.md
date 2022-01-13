---
title: Best Practices
description: Rules for best practices in Node.JS applications
tags:
  - eslint
  - programming
  - best practices
  - guidelines
  - node.js
  - javascript
---

# Best Practices

## `package.json`

In Node.JS projects you can use the `"engines"` field to specify the version of Node.JS that your project requires. This does not only help developers by warning them if their version isn't suitable for your projects, avoiding hours of potential headaches trying to debug cryptic errors - but it will instruct `eslint-plugin-node` to warn about APIs that are specific to the version you're running.

## Legacy APIs

We recommend avoiding legacy APIs as much as possible.

### Example

**Bad**

```js
var fs = require("fs");
fs.exists("./foo.js", function () {});
```

**Good**

```js
var fs = require("fs");
fs.stat("./foo.js", function () {});
```

### ESLint Rule

```json
{ "node/no-deprecated-api": "error" }
```
