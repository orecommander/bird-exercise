module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion:  2020,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/camelcase": 0
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
      }
    }
  ]
};
