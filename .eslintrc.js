module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'jsx-a11y', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.{css, scss}'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: { paths: ['src'] },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-use-before-define': 'off',
    'no-console': 'warn',
    'no-shadow': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
      },
    ],
    'require-yield': 0,
    'import/no-extraneous-dependencies': ['off'],
    'import/prefer-default-export': 'off',
    'react/display-name': ['off'],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx'],
      },
    ],
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/forbid-prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-uses-vars': 'error',
    'react/require-default-props': 'off',
    'react/self-closing-comp': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/sort-comp': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/click-events-have-key-events': 'off',
    'sx-a11y/no-noninteractive-element-interactions': 'off',
    '@typescript-eslint/no-empty-function': ['warn', { allow: ['arrowFunctions'] }],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
