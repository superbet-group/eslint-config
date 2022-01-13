module.exports = {
  plugins: ["jest"],
  env: {
    "jest/globals": true,
    node: true,
  },
  extends: ["./base", "./es6"],
};
