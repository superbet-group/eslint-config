module.exports = {
  plugins: ["node"],
  rules: {
    // ensure Node.js-style error-first callback pattern is followed
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-callback-literal.md
    "node/no-callback-literal": "error",

    // disallow the assignment to exports
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-exports-assign.md
    "node/no-exports-assign": "error",

    //disallow import declarations which import extraneous modules
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-extraneous-import.md
    // NOTE: eslint-plugin-import handles this too
    "node/no-extraneous-import": "off",

    //disallow require declarations which import extraneous modules
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-extraneous-import.md
    // NOTE: eslint-plugin-import handles this too
    "node/no-extraneous-require": "off",

    // disallow bin files that npm ignores
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unpublished-bin.md
    "node/no-unpublished-bin": "error",

    // disallow unsupported ECMAScript built-ins on the specified version
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unsupported-features/es-builtins.md
    "node/no-unsupported-features/es-builtins": "error",

    // disallow unsupported ECMAScript syntax on the specified version
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unsupported-features/es-syntax.md
    "node/no-unsupported-features/es-syntax": "error",

    // disallow unsupported Node.js built-ins on the specified version
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unsupported-features/node-builtins.md
    "node/no-unsupported-features/node-builtins": "error",

    // make process.exit() expressions the same code path as throw
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/process-exit-as-throw.md
    "node/process-exit-as-throw": "error",

    // suggest correct usage of shebang
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/shebang.md
    "node/shebang": "error",
  },
};
