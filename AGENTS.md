# AGENTS.md

## Project

Build a Snowflake ID library with Node.js 26.
Use native ESM.

## Scope and boundaries

Keep this package focused on Snowflake ID generation.

## Layout

Keep source files in `src/`.
Keep tests in `tests/`.
Keep guides in `docs/`.
Keep examples in `examples/`.
Keep specifications in `specs/`.

## Development

Keep each module focused on one purpose.
Keep each TypeScript declaration beside its ESM module.

## Validation

Run `npm test`.
Run `npm run lint`.
Run `npm run audit`.
Run `npm run format`.
Run `npm run format:check`.

## Security

Keep credentials and private data private.
Use IDs as identifiers, not secrets.

## Changes

Keep documentation current and direct.
Get release approval before publication.

## Library

Run focused tests first during development.
Run one test file with `npm test -- tests/path/to/example.test.mjs`.
Run multiple test files with `npm test -- tests/path/to/first.test.mjs tests/path/to/second.test.mjs`.
Prevent repeated full-suite runs during development.
Run the full `npm test` suite for final validation before a commit, milestone, or release.

## npm publication

Publish `@eliware/snowflake` only after release approval.
Use `package.json.version` as the package version.
Run package validation before you inspect the package.
