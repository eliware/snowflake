# Release Notes

## 12.0.0 — 2026-10-12

### Changed

- Updated the package to the v12 repository conventions.
- Updated the shared test harness and publication workflows.
- Preserved the Snowflake generator API and decimal string output.

## 2.0.0 — 2026-08-28

### Added

- Added fail-fast sequence overflow handling and expanded boundary coverage.
- Added TypeScript declarations for public exports and options.

### Changed

- Adopted `@eliware/test` for tests and lint checks.
- Updated package metadata, documentation, and CI for Node.js 26 or newer.
- Reorganized production modules under `src/` and tests under `tests/`.

### Breaking changes

- Changed the `test` and `lint` scripts to use `@eliware/test`.

## 1.1.5 — 2026-08-07

### Changed

- Aligned the repository layout, scripts, documentation, and package contents.
- Added TypeScript declaration checks and package validation.
- Moved tests under `tests/` and added a runnable native ESM example.
- Removed the legacy CommonJS package entry point.

## 1.1.4 — 2026-08-07

### Changed

- Removed the unused `@eliware/common` runtime dependency.
- Added manual GitHub Actions workflow dispatch support.

## 1.1.2 — 2026-08-06

### Added

- Added a configurable BigInt-safe Snowflake ID generator.
- Added the Eliware epoch, worker IDs, and process IDs.
- Added clock rollback protection and sequence overflow handling.
- Added injectable clocks, range checks, and timestamp capacity checks.
- Added TypeScript declarations for public options and exports.

### Changed

- Removed CommonJS entry points and tests. The package now uses native ESM.
- Expanded deployment and bit layout guidance.
