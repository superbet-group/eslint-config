const { resolve } = require("path");

module.exports = {
  env: {
    node: true,
    es6: true,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: resolve(__dirname, "./tsconfig.json"),
      },
      extends: ["."],
    },
  ],
};
