const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat();
const customPlugin = require('./eslint-plugin-custom');

module.exports = [
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'custom': customPlugin,
    },
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { "argsIgnorePattern": "^_" }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      'custom/convert-snake-to-camel': ['error', {
        ignore: ['^[A-Z_]+$', '^_id$', '^__v$', 'Access-Control-.*', 'default-src', 'frame-ancestors']
      }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['variable', 'function', 'parameter', 'property', 'method', 'memberLike', 'typeLike', 'objectLiteralProperty'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          filter: {
            regex: '^(_id|__v|Access-Control-.*|default-src|frame-ancestors|Environment Vars|Computed Vars)$',
            match: false
          }
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE', 'PascalCase'],
        },
      ],
    },
  },
];