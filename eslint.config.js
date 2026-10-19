import { base } from '@template/config/eslint';

// Root-level files only. Each workspace package has its own eslint.config.js.
export default [...base, { ignores: ['apps/**', 'packages/**'] }];
