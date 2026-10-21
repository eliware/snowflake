# AGENTS.md

## Project

Maintain `@eliware/snowflake`, a Snowflake ID library owned by Eliware.

## Scope and boundaries

Limit this package to Snowflake ID generation.

## Layout

Use `README.md` and `specs/README.md` to find repository paths.

## Development

Use Node.js 26 and native ESM for maintained JavaScript.

## Validation

Run `npm test`.
Run `npm run lint`.
Run `npm run audit`.
Run `npm run format`.
Run `npm run format:check`.

## Security

Keep credentials, private data, and runtime state out of Git.

## Changes

Update the nearest index when you add a document.

## Library

Run focused tests first during development.
Run one test file with `npm test -- tests/path/to/example.test.mjs`.
Run multiple test files with `npm test -- tests/path/to/first.test.mjs tests/path/to/second.test.mjs`.
Prevent repeated full-suite runs during development.
Run the full `npm test` suite for final validation before a commit, milestone, or release.

## npm publication

Run `npm run pack` to check package contents.
Follow the approved release procedure.
