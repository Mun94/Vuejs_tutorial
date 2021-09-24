module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'exem',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('@vue/cli-service/webpack.config.js'),
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2020,
    // parser: 'babel-eslint',
    // sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
      'd.ts': 'never',
    }],
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',
    'no-useless-constructor': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-webpack-loader-syntax': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    'lines-between-class-members': ['error', 'always',
      { exceptAfterSingleLine: true },
    ],
  },
};
