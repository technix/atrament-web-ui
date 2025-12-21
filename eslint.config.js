import preact from 'eslint-config-preact';
import stylistic from '@stylistic/eslint-plugin';
export default [
  ...preact,
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/function-call-spacing": ["error", "never"],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/space-in-parens": ["error", "never"]
    }
  }
];
