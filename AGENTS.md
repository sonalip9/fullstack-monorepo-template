# AGENTS.md

TypeScript monorepo: pnpm workspaces, Turborepo, NestJS API. ESM everywhere.

## Commands

Run from the repository root.

- `pnpm install`: install. Uses a frozen lockfile in CI.
- `pnpm check`: lint, typecheck, test and build. Run it before you finish a change.
- `pnpm dev`: API on `PORT` (default 3000). `GET /health` returns `HealthResponse`.
- `pnpm turbo run <task> --filter=<package>`: run one task for one package.

## Layout

- `apps/api`: NestJS app (`@template/api`).
- `packages/types`: API contracts, types only (`@template/types`). Built to `dist/`.
- `packages/config`: shared ESLint flat config and tsconfig presets (`@template/config`).
- `docs/adr`: decisions. `docs/swapping`: how to replace a library or tool.

## Rules

- Add a shared dependency version to the `catalog:` in `pnpm-workspace.yaml`. Reference it as `catalog:`.
- Pin a version only from what `pnpm install` or `npm view` printed. Do not write versions from memory.
- Do not allow dependency install scripts in `allowBuilds` without a stated reason.
- Relative imports end in `.js` (NodeNext modules).
- A library that carries behavior goes behind a seam: a project-owned module, one adapter folder, a `no-restricted-imports` rule and a `docs/swapping/` note. See [ADR-0004](docs/adr/0004-third-party-libraries-sit-behind-a-seam.md). Do not wrap NestJS, Turborepo, pnpm or dev tooling.
- Commits: `type(scope): subject`. One concern per commit. Lowercase subject, no trailing period, 72 characters at most. commitlint enforces it.
- Do not commit secrets, real resource IDs or personal data.

## Tests

Vitest with `unplugin-swc` (Nest needs decorator metadata). Unit tests: `src/**/*.spec.ts`. E2E: `test/**/*.e2e-spec.ts`.
