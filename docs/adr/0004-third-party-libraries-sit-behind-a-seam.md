# ADR-0004: Third-party libraries sit behind a seam

**Status:** Accepted
**Date:** 2026-10-19

## Context

A library that many files import is hard to replace. The template adds libraries layer by layer, so the rule should exist before the first one that needs it.

## Decision

1. App code imports a module the project owns (an interface, wrapper or set of hooks) with project-owned names and types. No library type appears in its public signature.
2. One adapter folder per library. Only that folder imports the library.
3. An ESLint `no-restricted-imports` rule allows the library only inside its adapter folder. Tests use a fake adapter.
4. `docs/swapping/<topic>.md` states which folder to rewrite, what stays untouched and the rough size of the change.

**No seam** for foundations (NestJS, React, Expo, Next.js), dev tooling and tiny utilities.

## Consequences

- v0.1.0 adopts no library that needs a seam, so it adds only the swap notes. The first one arrives with the database layer.
- Each seam costs one small module and one lint rule.
