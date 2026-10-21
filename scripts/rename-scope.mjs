#!/usr/bin/env node
// Replaces the `@template/` package scope with your own.
// Usage: node scripts/rename-scope.mjs @acme
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const OLD_SCOPE = '@template/';
const SKIP = new Set(['pnpm-lock.yaml', 'scripts/rename-scope.mjs']);
const root = fileURLToPath(new URL('..', import.meta.url));

const scope = process.argv[2];
if (!scope || !/^@[a-z0-9][a-z0-9._-]*$/.test(scope)) {
  console.error('Usage: node scripts/rename-scope.mjs @name');
  console.error('The scope must start with @ and use lowercase letters, digits, ".", "_" or "-".');
  process.exit(1);
}
if (`${scope}/` === OLD_SCOPE) {
  console.error(`The scope is already ${scope}.`);
  process.exit(1);
}

const files = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
  .split('\0')
  .filter((file) => file && !SKIP.has(file));

let changed = 0;
for (const file of files) {
  const buffer = readFileSync(new URL(file, `file://${root}/`));
  if (buffer.includes(0)) continue; // binary
  const text = buffer.toString('utf8');
  if (!text.includes(OLD_SCOPE)) continue;
  writeFileSync(new URL(file, `file://${root}/`), text.replaceAll(OLD_SCOPE, `${scope}/`));
  changed += 1;
}
console.log(`Renamed ${OLD_SCOPE} to ${scope}/ in ${changed} files.`);

// Refresh the lockfile and the workspace links under node_modules.
execFileSync('pnpm', ['install', '--no-frozen-lockfile'], { cwd: root, stdio: 'inherit' });
