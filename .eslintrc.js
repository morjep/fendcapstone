module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },

  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "no-console": "off",
  },
};
