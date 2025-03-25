module.exports = {
  "extends": "airbnb-base",
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': 'off',
    'linebreak-style': ['error', 'unix'],
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  }
}


