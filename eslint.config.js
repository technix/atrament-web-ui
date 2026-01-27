import preact from 'eslint-config-preact';
import stylistic from '@stylistic/eslint-plugin';
export default [
  ...preact,
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      "@stylistic/arrow-spacing": "error",
      "@stylistic/block-spacing": "error",
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/function-call-spacing": ["error", "never"],
      '@stylistic/indent': ['error', 2],
      "@stylistic/key-spacing": "error",
      "@stylistic/keyword-spacing": "error",
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/no-confusing-arrow": "error",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/space-in-parens": ["error", "never"]
    }
  }
];
