# AGENTS.md

## Project

Build a Snowflake ID library with Node.js 26 or later. Use native ESM.

## Scope and boundaries

Keep the package focused on creating Snowflake IDs.
Do not use validation to publish, deploy, or change external systems.

## Layout

Keep library code under `src/` and tests under `tests/`.
Keep one test module for each source module.
Keep user guides under `docs/`, examples under `examples/`, and rules under `specs/`.

## Development

Keep each source and test module focused on one purpose.
Keep public API declarations beside their source module.
Use decimal strings for generated IDs.

## Validation

Use Node.js 26 or later and native ESM.
Run `npm test` for aggregate validation.
Run `npm run lint` for lint checks.
Run `npm run audit` for dependency checks.
Run `npm run format` to format files.
Run `npm run format:check` to check file format.
Run `npm run typecheck` to check TypeScript declarations.
Run `npm run pack` to check package contents.

## Security

Protect credentials, tokens, secrets, private data, and machine-specific values.
Treat Snowflake IDs as identifiers, not secrets.

## Changes

Keep documentation current and direct.
Follow shared conventions and the Eliware Operations approval process.

## Library

Export the generator and its options from `src/index.mjs`.
Return IDs as decimal strings.
Keep declarations in `src/` beside their matching ESM modules.

## npm publication

The public package is `@eliware/snowflake`.
Use `package.json.version` as the package version.
Check package contents before publication review.
Follow the Eliware Operations publication checklist and approval process.
