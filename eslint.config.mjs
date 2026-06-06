import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupPluginRules } from '@eslint/compat';
import markdown from '@eslint/markdown';
import tsEslint from 'typescript-eslint';
import ymlEslint from 'eslint-plugin-yml';
import json from '@eslint/json';
import jsEslint from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactEslint from 'eslint-plugin-react';
import reactNativeEslint from 'eslint-plugin-react-native';
import reactNativeTestLib from 'eslint-plugin-testing-library';

export default defineConfig([
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    files: ['**/*.{ts,tsx}'],
    plugins: {
      tsEslint,
      jsEslint,
      reactEslint,
      'react-hooks': reactHooks,
      'react-native': fixupPluginRules({
        rules: reactNativeEslint.rules,
      }),
    },
    extends: [
      jsEslint.configs.recommended,
      tsEslint.configs.recommended,
      reactEslint.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
    ],
    rules: {
      ...reactNativeEslint.configs.all.rules,
      '@typescript-eslint/no-require-imports': [
        'error',
        { allow: ['/*\\.png$'] },
      ],
    },
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: { reactNativeTestLib },
  },
  {
    files: ['**/*.{mjs}'],
    plugins: { jsEslint },
    extends: [jsEslint.configs.recommended],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    processor: 'markdown/markdown',
  },
  {
    files: ['**/*.ymlEslint'],
    plugins: { ymlEslint },
    extends: [ymlEslint.configs['flat/recommended']],
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/jsonc',
  },
  globalIgnores([
    '.yarn/*',
    'assets/*',
    'coverage/*',
    'example/.expo/*',
    'example/.yarn/*',
    'example/assets/*',
    'example/node_modules/*',
    'example/.gitignore',
    'example/yarn.lock',
    'node_modules/*',
    'screenshots/*',
    '.gitignore',
    '.npmignore',
    '.prettierignore',
    '.yarnrc.yml',
    'LICENSE',
    'CHANGELOG.md',
    'yarn.lock',
  ]),
]);
