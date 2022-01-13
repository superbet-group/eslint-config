# Superbet's ESLint Configuration for Projects Tested with Jest

Use this configuration to enhance your testing experience with `jest`.

## Installation

```bash
npm i -SE @superbet/eslint-config-jest
```

## Adding it to Your Config

We recommend not mixing this configuration with other configurations related to project files that are not tests. Some rules may come into conflict with non-test files. To avoid this, there are two valid approaches:

### Overriding on a Per-File Basis

`.eslintrc`

```json
{
  "overrides": [
    {
      "files": [
        "**/*.test.js",
        "**/*.test.jsx",
        "**/*.spec.js",
        "**/*.spec.jsx"
      ],
      "extends": "@superbet/eslint-config-jest"
    }
  ]
}
```

### Overriding on a Per-Directory Basis

Either add the following to your `.eslintrc`:

> NOTE: replace `__TESTS__/**/*` with your test directory.

```json
{
  "overrides": [
    {
      "files": ["__TESTS__/**/*"],
      "extends": "@superbet/eslint-config-jest"
    }
  ]
}
```

Or add a new `.eslintrc` file in your test directory:

```json
{
  "extends": "@superbet/eslint-config-jest"
}
```
