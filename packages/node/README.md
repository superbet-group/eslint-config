# Superbet's ESLint Configuration for Node.JS Projects

Add this configuration to your `.eslintrc` if one of the target environments you're working on is Node.JS.

## Installation

```bash
npm i -SE @superbet/eslint-config-node
```

`.eslintrc`

```json
{
  "extends": "@superbet/eslint-config-node"
}
```

## Mixing it Up

Some full stack applications, such as ones written with Next.JS, Remix or Gatsby, use a combination of client and server files in the same project. You can apply this configuration via `"overrides"` to target specific directories:

```json
{
  "overrides": [
    { "files": ["src/api/**/*"], "extends": "@superbet/eslint-config-node" }
  ]
}
```

or if you have a convention to utilise file extensions to determine the target environment:

```json
{
  "overrides": [
    { "files": ["*.server.js"], "extends": "@superbet/eslint-config-node" }
  ]
}
```
