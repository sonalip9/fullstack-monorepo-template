import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Shared ESLint flat config. Spread it into a package's eslint.config.js:
 *   export default [...base, { ...package-specific rules }];
 */
export const base = tseslint.config(
  { ignores: ['dist/**', 'coverage/**', '.turbo/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
);

export default base;
