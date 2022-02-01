module.exports = {
  extends: ["./index"],
  rules: {
    // Disallow use of `require` for importing modules
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-require-imports.md
    "@typescript-eslint/no-require-imports": "off",

    // Disallow assigning result of `require` to a variable instead of `import variable = require("variable")` syntax
    // // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-var-requires.md
    "@typescript-eslint/no-var-requires": "error",
  },
};
