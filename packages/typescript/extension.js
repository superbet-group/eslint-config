// NOTE: when enabling the ESLint built in rules that correspoding to any of the below,
// make sure you also disable them in this config and enable the typescript-eslint version instead

const bestPractices = require("@superbet/eslint-config-base/best-practices");
const errors = require("@superbet/eslint-config-base/errors");
const es6 = require("@superbet/eslint-config-base/es6");
const variables = require("@superbet/eslint-config-base/variables");

module.exports = {
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/brace-style.md
    "@typescript-eslint/brace-style": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/comma-dangle.md
    "@typescript-eslint/comma-dangle": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/comma-spacing.md
    "@typescript-eslint/comma-spacing": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/default-param-last.md
    "default-param-last": "off",
    "@typescript-eslint/default-param-last":
      bestPractices.rules["default-param-last"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/dot-notation.md
    "dot-notation": "off",
    "@typescript-eslint/dot-notation": bestPractices.rules["dot-notation"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/func-call-spacing.md
    "@typescript-eslint/func-call-spacing": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/indent.md
    "@typescript-eslint/indent": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/init-declarations.md
    "init-declarations": "off",
    "@typescript-eslint/init-declarations":
      variables.rules["init-declarations"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/keyword-spacing.md
    "@typescript-eslint/keyword-spacing": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/lines-between-class-members.md
    "@typescript-eslint/lines-between-class-members": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-array-constructor.md
    "@typescript-eslint/no-array-constructor": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
    "no-dupe-class-members": "off",
    "@typescript-eslint/no-dupe-class-members":
      es6.rules["no-dupe-class-members"],

    // NOTE: eslint-plugin-import replaces this, however it requires additional configuration to work with TS, see "./import.js"
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-duplicate-imports.md
    "no-duplicate-imports": "off",
    "@typescript-eslint/no-duplicate-imports":
      es6.rules["no-duplicate-imports"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-empty-function.md
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function":
      bestPractices.rules["no-empty-function"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-extra-parens.md
    "no-extra-parens": "off",
    "@typescript-eslint/no-extra-parens": errors.rules["no-extra-parens"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-extra-semi.md
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": errors.rules["no-extra-semi"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-implied-eval.md
    "no-implied-eval": "off",
    "@typescript-eslint/no-implied-eval":
      bestPractices.rules["no-implied-eval"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-invalid-this.md
    "no-invalid-this": "off",
    "@typescript-eslint/no-invalid-this":
      bestPractices.rules["no-invalid-this"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-loop-func.md
    "no-loop-func": "off",
    "@typescript-eslint/no-loop-func": bestPractices.rules["no-loop-func"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
    "no-loss-of-precision": "off",
    "@typescript-eslint/no-loss-of-precision":
      errors.rules["no-loss-of-precision"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-magic-numbers.md
    "no-magic-numbers": "off",
    "@typescript-eslint/no-magic-numbers":
      bestPractices.rules["no-magic-numbers"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-redeclare.md
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": bestPractices.rules["no-redeclare"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-restricted-imports.md
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports":
      es6.rules["no-restricted-imports"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-shadow.md
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": variables.rules["no-shadow"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-throw-literal.md
    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal":
      bestPractices.rules["no-throw-literal"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-expressions.md
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions":
      bestPractices.rules["no-unused-expressions"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-vars.md
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": variables.rules["no-unused-vars"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-use-before-define.md
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define":
      variables.rules["no-use-before-define"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-useless-constructor.md
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor":
      es6.rules["no-useless-constructor"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/object-curly-spacing.md
    "@typescript-eslint/object-curly-spacing": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/padding-line-between-statements.md
    "@typescript-eslint/padding-line-between-statements": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/quotes.md
    "@typescript-eslint/quotes": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/require-await.md
    "require-await": "off",
    "@typescript-eslint/require-await": bestPractices.rules["require-await"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/return-await.md
    "return-await": "off",
    "@typescript-eslint/return-await":
      bestPractices.rules["return-await"] || "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/semi.md
    "@typescript-eslint/semi": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/space-before-function-paren.md
    "@typescript-eslint/space-before-function-paren": "off",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/space-infix-ops.md
    "@typescript-eslint/space-infix-ops": "off",
  },
};
