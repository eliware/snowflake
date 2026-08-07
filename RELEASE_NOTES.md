# Release Notes

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
