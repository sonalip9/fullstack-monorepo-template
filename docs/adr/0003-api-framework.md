# ADR-0003: NestJS for the API

**Status:** Accepted
**Date:** 2026-10-19

## Context

The API needs routing, dependency injection and a test setup, and it must scale from one endpoint to a layered application.

## Decision

Use **NestJS** (with the Express adapter). It is the foundation of `apps/api` and is not wrapped behind a project-owned interface. Controllers, modules and providers use Nest directly.

- The API is ESM. Nest 12 ships as ESM.
- Tests use **Vitest** with `unplugin-swc`. Nest's dependency injection reads decorator metadata, which esbuild (Vitest's default transform) does not emit. SWC does.
- The build uses `tsc`. `nest start --watch` runs the dev server.

## Considered options

- **Fastify, Hono or Express alone:** smaller, faster to start. They leave structure, injection and module boundaries to the project.
- **Next.js route handlers:** fewer deployables, but ties the API to the web app's lifecycle.

## Consequences

- Replacing Nest rewrites `apps/api` but not `packages/types`. See [docs/swapping/api-framework.md](../swapping/api-framework.md).
- Libraries that the API adopts later (database, cache, storage) are different: they carry behavior and go behind a seam ([ADR-0004](0004-third-party-libraries-sit-behind-a-seam.md)).
