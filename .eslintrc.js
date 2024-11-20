module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
          "airbnb-base",
          "airbnb-typescript/base",
          "prettier",
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
          ],
      parserOptions: {
        parser: "@typescript-eslint/parser",
        project: "tsconfig.json",
        sourceType: "module",
      },
      rules: {
        "import/prefer-default-export": "off" | "warn" | "error",
        "import/no-extraneous-dependencies": ["error", {"packageDir": path.join(__dirname, 'some-dir')}]
      }
    },
  ],
};