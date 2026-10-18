# AGENTS.md

## Project

Build a Snowflake ID library with Node.js 26.
Use native ESM.

## Scope and boundaries

Keep this package focused on Snowflake ID generation.
Do not use validation to publish, deploy, or change external systems.

## Layout

Keep implementation modules under `src/`.
Keep matching tests under `tests/`.
Keep user guides under `docs/`.
Keep examples under `examples/`.
Keep rules under `specs/`.

## Development

Keep each module focused on one purpose.
Keep each TypeScript declaration beside its ESM module.

## Validation

Use Node.js 26.
Use native ESM.
Run `npm test` for aggregate validation.
Run `npm run lint` for lint checks.
Run `npm run audit` for dependency checks.

Run `npm run format` to format files.
Run `npm run format:check` to check file format.

Run `npm run typecheck` to check TypeScript declarations.
Run `npm run pack` to check package contents.

## Security

Keep credentials, tokens, secrets, private data, and machine-specific values private.
Use Snowflake IDs as identifiers, not secrets.

## Changes

Keep docs current and direct.
Follow the Eliware Operations approval process for release changes.
Do not use validation as release approval.

## Library

Export the generator API from `src/index.mjs`.
Return each generated ID as a decimal string.
Keep declarations in `src/` beside their ESM modules.

Run focused tests first during development.
Run one test file with `npm test -- tests/path/to/example.test.mjs`.
Run multiple test files with `npm test -- tests/path/to/first.test.mjs tests/path/to/second.test.mjs`.
Prevent repeated full-suite runs during development.
Run the full `npm test` suite for final validation before a commit, milestone, or release.

## npm publication

Publish the `@eliware/snowflake` package only after release approval.
Use `package.json.version` as the package version.
Run package validation before publication inspection.
