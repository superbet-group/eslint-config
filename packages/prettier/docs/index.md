---
title: Prettier
description: Superbet Engineering ESLint uses Prettier for formatting code.
tags:
  - eslint
  - prettier
  - formatting
  - configuration
---

# Prettier

To format code, we rely on the [Prettier](https://prettier.io/) package. Its purpose is to enforce opinionated stylistic rules to the code. The guiding principle is that given any snippet of code, it should only be possible to format it in a single way. This makes the codebase more readable, reduces visual strain on developers working on it, makes it easier to review and reduces the number of choices having to be made while working on the codebase.

Using a unified set of rules for formatting on all files also reduces the amount of merge conflicts that can arise when working on the codebase.

## Configuration

It is possible to override Prettier's configuration.

> NOTE: We recommend leaving Prettier's rules as they are. We do not recommend overriding them. The Prettier team invested more time into coming up with defaults than we should ever have to. The rules of probability also dictate that it is what most people will be familiar with, so new joiners on projects using these rules do not have to adapt and learn new rules.

To override configuration, you may use the following options:

- A "prettier" key in your package.json file.
- A .prettierrc file written in JSON or YAML.
- A .prettierrc.json, .prettierrc.yml, .prettierrc.yaml, or .prettierrc.json5 file.
- A .prettierrc.js, .prettierrc.cjs, prettier.config.js, or prettier.config.cjs file that exports an object using module.exports.
- A .prettierrc.toml file.
