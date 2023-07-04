## Deprecated

This package is now split into different packages based on the language / technology the rules support.

Consider updating to `@superbet/eslint-config-typescript-react-jest` for similar functionality.

![@superbet/eslint-config logo](/logo.svg "ESLint logo with Superbet colors")

# Superbet Shared ESLint Config

ESLint statically analyzes your code to quickly find problems. ESLint is built into most text editors and you can run ESLint as part of your continuous integration pipeline.

- [Getting Started](https://eslint.org/docs/user-guide/getting-started)
- [Configuring](https://eslint.org/docs/user-guide/configuring)
- [Rules](https://eslint.org/docs/rules/)
- [Shareable Configs](https://eslint.org/docs/developer-guide/shareable-configs)

## Add to a Project

### Install Configuration

```bash
npm install @superbet/eslint-config --save-dev
```

Also add Peer Dependencies:

```bash
npm install eslint prettier typescript --save-dev
```

### Add to ESLint Configuration

```json
{
  "extends": "@superbet/eslint-config"
}
```

_Using `.eslintrc` file_

Or

```js
module.exports = {
  extends: "@superbet/eslint-config",
};
```

_Using `.eslintrc.js` file_

## Suggestions?

Create a discussion on [GitHub](/discussions) or [learn how to make a contribution](https://github.com/firstcontributions/first-contributions).
