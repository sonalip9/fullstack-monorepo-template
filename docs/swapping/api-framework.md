# Swapping the API framework

Current choice: NestJS with the Express adapter. See [ADR-0003](../adr/0003-api-framework.md). NestJS is a foundation of `apps/api`, so it is not wrapped. A swap rewrites the app, not a seam.

## What to rewrite

Everything in `apps/api/src` that imports `@nestjs/*`:

- `main.ts`: server bootstrap.
- `app.module.ts` and `*.module.ts`: wiring. Replace with plain factory functions or the new framework's plugin or route registration.
- `*.controller.ts`: route handlers.
- `test/*.e2e-spec.ts`: the Nest testing module. Replace with the framework's own test helper or start the server and call it with `supertest`.
- `package.json`, `nest-cli.json`, `apps/api/tsconfig*.json` (they extend `tsconfig.nest.json`), and the `swc` plugin in `vitest.config.ts` (not needed without decorators).

## What stays untouched

- `packages/types`: `HealthResponse` is plain TypeScript.
- `packages/config`, except the `tsconfig.nest.json` preset, which can be deleted.
- Root workspace, Turborepo and CI config. The `build`, `lint`, `typecheck`, `test` and `dev` script names in `apps/api/package.json` stay the same.
- Any logic written as plain classes or functions without Nest decorators.

## Options

| Option                 | Notes                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| Fastify                | Closest in model (routes, hooks, plugins). Fast. You write the structure that Nest gives you. |
| Hono                   | Small and portable across runtimes. Good for edge deployment. Fewer built-in Node features.   |
| Express                | Most familiar. Minimal. No dependency injection.                                              |
| Next.js route handlers | Removes the separate API deployable. Couples the API to the web app.                          |

## Rough size

A one-endpoint API: under an hour. Each added module, controller and provider adds the same again. Nest's dependency injection is the costly part: replace it with explicit constructor arguments built in `main.ts`.

## Check the result

```bash
pnpm check && pnpm dev   # then: curl localhost:3000/health
```
