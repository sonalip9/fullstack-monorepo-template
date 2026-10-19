# ADR-0002: Shared config and types packages

**Status:** Accepted
**Date:** 2026-10-19

## Context

Every app needs the same ESLint rules and TypeScript settings. Apps that talk to each other need one definition of the data they exchange.

## Decision

- `@template/config` holds the shared ESLint flat config (`@template/config/eslint`) and tsconfig presets (`tsconfig.base.json`, `tsconfig.nest.json`). Packages extend them and add only what is specific to them.
- `@template/types` holds API contracts as plain TypeScript types, with no runtime code. The API returns `HealthResponse`; later clients import the same type.
- Packages are private and use a neutral `@template/` scope. Rename the scope after creating a repository from the template.
- `@template/types` is built with `tsc` to `dist/`. Consumers depend on the build output, and Turborepo builds it first through `^build`.
- Packages are ESM (`"type": "module"`), with relative imports written with the `.js` extension.

## Considered options

- **Point `exports` at TypeScript source:** no build step for types, but every consumer's toolchain must compile TypeScript from another package.
- **Duplicate configs per app:** simple at first, drifts over time.

## Consequences

- A change in `packages/types` triggers a rebuild of its dependants.
- Contracts are types only. Runtime validation, if added later, is a separate decision.
