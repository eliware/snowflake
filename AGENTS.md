# AGENTS.md

## Project

Build a Snowflake ID library with Node.js 26. Use native ESM.

## Scope and boundaries

Keep this package focused on Snowflake ID generation.
Do not use validation to publish, deploy, or change external systems.

## Layout

Keep implementation modules under `src/` and matching tests under `tests/`.
Keep user guides under `docs/`, examples under `examples/`, and rules under `specs/`.

## Development

Keep each module focused on one purpose.
Keep TypeScript declarations beside their matching ESM modules.

## Validation

Use Node.js 26 and native ESM.
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

Keep docs current and direct.
Follow the Eliware Operations approval process for release changes.
Do not treat validation as release approval.

## Library

Export the public generator API from `src/index.mjs`.
Return each generated ID as a decimal string.
Keep declarations in `src/` beside their matching ESM modules.

## npm publication

Publish the `@eliware/snowflake` package only after release approval.
Use `package.json.version` as the package version.
Run package validation before publication review.
