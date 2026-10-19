# Swapping the monorepo tooling

Current choice: pnpm workspaces + catalogs, Turborepo. See [ADR-0001](../adr/0001-monorepo-tooling.md). This is dev tooling, so there is no adapter folder. The change touches root config files only.

## What to rewrite

| Piece           | Files                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Package manager | `pnpm-workspace.yaml`, `package.json` (`packageManager`, root scripts), `.github/workflows/ci.yml`, `.husky/*`, lockfile |
| Task runner     | `turbo.json`, root scripts in `package.json`, `.gitignore` (`.turbo`)                                                    |

## What stays untouched

App and package source code, `tsconfig` files, ESLint config, tests.

## Options

| Option                  | What changes                                                                                                                                                                                                           |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm workspaces          | Move `packages` globs to `workspaces` in `package.json`. Replace `workspace:*` with `*`. No catalogs: repeat versions or use an `overrides` block. No install-script allowlist: use `ignore-scripts=true` in `.npmrc`. |
| yarn workspaces         | Same globs in `package.json`. Yarn 4 has catalogs and `enableScripts`.                                                                                                                                                 |
| bun workspaces          | Globs and catalogs in `package.json`. Install scripts are denied unless listed in `trustedDependencies`.                                                                                                               |
| Nx instead of Turborepo | Replace `turbo.json` with `nx.json` target defaults. Keep the package manager.                                                                                                                                         |
| No task runner          | Use `pnpm -r --workspace-concurrency=1 run <task>`. Order follows the dependency graph. You lose caching.                                                                                                              |

## Rough size

Half a day for a package manager swap: config files, one lockfile, CI. A task runner swap is under two hours for five tasks.

## Check the result

```bash
<install> && <run lint> && <run typecheck> && <run test> && <run build>
```
