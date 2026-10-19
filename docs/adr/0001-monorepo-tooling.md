# ADR-0001: pnpm workspaces and Turborepo

**Status:** Accepted
**Date:** 2026-10-19

## Context

The template holds an API now and two frontends later. They share types, lint rules and TypeScript settings. One repository keeps those in step. Something has to link the packages, share dependency versions and run tasks in the right order.

## Decision

- **pnpm workspaces** link packages (`apps/*`, `packages/*`). Internal dependencies use `workspace:*`.
- **pnpm catalogs** (`catalog:` in `pnpm-workspace.yaml`) hold versions that more than one package uses. A version is written once.
- **Dependency install scripts are denied** with `allowBuilds`. pnpm fails the install when a package wants to run a script that is not listed. Allow a script only after checking that the package needs it.
- **Turborepo** runs `build`, `lint`, `typecheck`, `test` and `dev` as a task graph. `^build` makes a package build after the packages it depends on. Results are cached by input hash. `--filter` limits a run to one package and its dependencies.
- `packageManager` (package.json) and `.node-version` fix the tool versions for local work and CI.

## Considered options

- **npm, yarn or bun workspaces:** work for linking packages. pnpm gives strict dependency isolation, catalogs and install-script control without extra tools.
- **Nx:** more features (generators, project graph UI), more concepts to learn. Turborepo covers what this template needs.
- **No monorepo:** shared types would need a published package or copy and paste.

## Consequences

- Contributors need pnpm. Corepack or `pnpm/action-setup` reads the version from `packageManager`.
- A task must be declared in `turbo.json` before `turbo run` will run it.
- Swapping the tooling: see [docs/swapping/monorepo-tooling.md](../swapping/monorepo-tooling.md).
