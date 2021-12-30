module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "quotes": ["error", "double"],
    "max-len": ["error", {ignoreStrings: true}],
    "indent": ["error", 2, {MemberExpression: 1}],
  },
};
