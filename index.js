// has to be last in extends
const prettierConfig = "plugin:prettier/recommended";

const jsConfigs = ["airbnb", "airbnb/hooks"];
const jsPlugins = ["react", "jsx-a11y", "import", "prettier"];
const jsRules = {
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      js: "never",
      mjs: "never",
      jsx: "never",
      ts: "never",
      tsx: "never",
    },
  ],
  "import/order": [
    "error",
    {
      "newlines-between": "always",
      groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      pathGroups: [
        {
          pattern: "react",
          group: "external",
          position: "before",
        },
      ],
      pathGroupsExcludedImportTypes: ["builtin"],
      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
    },
  ],
  "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 1 }],
  curly: ["error", "all"],
};

const tsConfigs = ["plugin:@typescript-eslint/recommended"];
const tsPlugins = ["@typescript-eslint"];
const tsRules = {
  "@typescript-eslint/no-unused-vars": "error",
  "@typescript-eslint/explicit-member-accessibility": "off",
  "@typescript-eslint/no-object-literal-type-assertion": "off",
  // https://github.com/typescript-eslint/typescript-eslint/issues/2540
  "no-use-before-define": "off",
  "@typescript-eslint/no-use-before-define": "error",
  "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
  "react/prop-types": ["off", {}],
  "react/jsx-handler-names": [
    "error",
    {
      eventHandlerPrefix: "handle",
      eventHandlerPropPrefix: "on",
    },
  ],
};

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [...jsConfigs, ...tsConfigs, prettierConfig],
  plugins: [...jsPlugins, ...tsPlugins],
  globals: {},
  rules: {
    ...jsRules,
    ...tsRules,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
      },
    },
    "import/extensions": [".js", ".ts", ".mjs", ".jsx", ".tsx"],
  },
  overrides: [
    {
      files: [
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "**/*.tests.ts",
        "**/*.tests.tsx",
        "**/test.ts",
        "**/test.tsx",
      ],
      env: {
        jest: true,
      },
      extends: ["plugin:jest-dom/recommended", "plugin:testing-library/react"],
      plugins: ["jest", "jest-dom", "testing-library"],
    },
    {
      files: ["**/*.js"],
      parser: "espree",
      extends: [...jsConfigs, prettierConfig],
      plugins: jsPlugins,
      rules: jsRules,
    },
  ],
};
