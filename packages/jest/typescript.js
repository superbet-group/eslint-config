module.exports = {
  rules: {
    // Recommends using @ts-expect-error over @ts-ignore
    // NOTE: this is recommended in tests but definitely not in production code
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md
    "@typescript-eslint/prefer-ts-expect-error": "error",
  },
};
