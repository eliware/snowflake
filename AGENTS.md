# AGENTS.md

## Project

`@eliware/snowflake` is a dependency-free, BigInt-safe Discord-compatible Snowflake ID generator returning decimal strings.

## API and correctness

- Preserve default/named generators, constants, custom epoch, worker/process IDs, and injectable clocks.
- Keep IDs JSON/database safe as decimal strings.
- Preserve clock rollback protection, sequence overflow handling, range validation, and timestamp-capacity checks.
- Do not use generated IDs as secrets or authentication tokens.

## Validation

Run `npm test`, `npm run test:gaps`, `npm run lint`, `npm run typecheck`, and `npm run pack`. Maintain 100% coverage without Istanbul ignore directives.

## Changes

Update README and declarations for API changes. Do not bump versions, tag, publish, or push unless explicitly requested.
