export default {
  '*.{js,mjs,cjs,ts}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,yml,yaml}': 'prettier --write',
};
