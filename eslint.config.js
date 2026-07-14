// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      'import/no-named-as-default': 'off',
      // Expo/TypeScript resolves this alias through tsconfig.json.
      'import/no-unresolved': ['error', { ignore: ['^@/'] }],
    },
  },
]);
