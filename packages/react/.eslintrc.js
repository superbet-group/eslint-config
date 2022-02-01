const { resolve } = require("path");

module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      configFile: resolve(__dirname, "./babel.config.js"),
    },
  },
  extends: [".", "./jsx-runtime"],
};
