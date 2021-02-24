module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-multiple-empty-lines": [0, {"max": 100}],
    "indent":["off",2],
    "no-mixed-spaces-and-tabs": [0],
    "prefer-const": 0,
    "keyword-spacing": 0,
    "func-call-spacing": 0,
    "comma-spacing": 0,
    "no-multi-spaces": 0,
    "space-in-parens": 0,
    "space-after-keywords": [0, "always"],
    "space-before-blocks": [0, "always"],
    'no-unused-vars': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
