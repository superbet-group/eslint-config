module.exports = {
  extends: [
    "@superbet/eslint-config-base",
    "@superbet/eslint-config-prettier",
    "@superbet/eslint-config-react",
    "@superbet/eslint-config-react/jsx-runtime",
  ],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: ["@superbet/eslint-config-typescript"],
    },
    {
      files: [
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "__TESTS__/**/*.ts",
        "__TESTS__/**/*.tsx",
      ],
      extends: [
        "@superbet/eslint-config-jest",
        "@superbet/eslint-config-jest/typescript",
      ],
    },
  ],
};
