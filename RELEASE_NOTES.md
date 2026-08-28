# Release Notes

## 2.0.0 — Unreleased

- Adopted the shared `@eliware/test` harness for testing and linting with
  strict 100×4 coverage enforcement.
- Modernized package metadata, documentation, package contents, and CI for
  Node.js `>=26`, including cross-platform validation and tag-only publishing.
- Added production dependency auditing and repository-owned Knit validation.
- Breaking: the standard `test` and `lint` scripts now delegate to
  `@eliware/test`.

## 1.1.5 — August 7, 2026

- Aligned repository layout, scripts, CI, documentation, and package contents with Eliware library conventions.
- Added TypeScript declaration checking and standardized package validation.
- Moved tests under `tests/` and included a runnable `examples/` file in the package.
- Removed the legacy `main` metadata from this ESM-only package.
- Verification: tests, coverage, gap checks, lint, typecheck, smoke test, and package dry-run pass.

## 1.1.4 — August 7, 2026

### Changed

- Removed the unused `@eliware/common` runtime dependency.
- Reduced the installed dependency tree and regenerated the npm lockfile.
- Added manual GitHub Actions workflow dispatch support.

### Verification

- npm audit: 0 vulnerabilities.

## 1.1.2

### Added

- Rebuilt the generator around a configurable, BigInt-safe Snowflake implementation.
- Added the custom Eliware epoch: `365662380000n` (`1981-08-03T04:53:00Z`).
- Added worker ID and process ID fields for distributed deployments.
- Added clock rollback protection and sequence overflow handling.
- Added injectable clocks, range validation, and timestamp-capacity validation.
- Added TypeScript declarations for all public options and exports.

### Changed

- Removed CommonJS entrypoints and tests; the package is ESM-only.
- Expanded documentation with deployment and bit-layout guidance.
- Added complete generator behavior tests.

### Verification

- Jest coverage: 100% statements, branches, functions, and lines.
- Oxlint: 0 warnings and errors.
