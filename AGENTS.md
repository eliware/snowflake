# AGENTS.md

## Project

`@eliware/snowflake` is a dependency-free, BigInt-safe Discord-compatible Snowflake ID generator returning decimal strings.

## API and correctness

- Preserve default/named generators, constants, custom epoch, worker/process IDs, and injectable clocks.
- Keep IDs JSON/database safe as decimal strings.
- Preserve clock rollback protection, sequence overflow handling, range validation, and timestamp-capacity checks.
- Do not use generated IDs as secrets or authentication tokens.

## Validation

Run `npm test`, `npm run lint`, `npm run typecheck`, `npm audit --omit=dev --audit-level=moderate`, and `npm run pack`. Maintain 100% coverage without Istanbul ignore directives.

## Changes

Update README and declarations for API changes. Do not bump versions, tag, publish, or push unless explicitly requested.
- Do not over-engineer simple tasks.
- Do not guess when confused.
- Do not make random, pointless changes.
- Check your own work before saying you're done.
