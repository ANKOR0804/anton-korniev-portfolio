module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'tailwindcss'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended'
  ],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  settings: {
    tailwindcss: {
      callees: ['cn', 'classNames'],
      config: 'tailwind.config.js',
      strict: true
    }
  }
};