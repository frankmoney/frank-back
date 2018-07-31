module.exports = {
  root: true,
  extends: "frank",
  plugins: ["flowtype", "import"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
        moduleDirectory: ["node_modules", "."]
      },
      "babel-module": {
        extensions: [".js", ".ts", ".flow"],
        alias: {
          test: "./test"
        }
      }
    }
  },
  rules: {
    "jsx-a11y/no-static-element-interactions": "warn",
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 1,
    "import/order": 1
  }
};
