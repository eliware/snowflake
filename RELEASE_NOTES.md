# Release Notes

## 14.0.0 — 2026-10-20

### Changed

- Upgraded `@eliware/test` to 14.0.0 and updated npm dependencies.
- Set the package version to 14.0.0 and updated specification versions.
- Added required content to `AGENTS.md` for Convention 14.

## 13.0.0 — 2026-10-19

### Added

- Added the canonical npm publication workflow.
- Added full Git history to CI.

### Changed

- Updated the package to version 13.0.0 and upgraded `@eliware/test` and npm dependencies.
- Aligned CI and npm publication workflows with the current templates and checkout action.
- Updated Knit deployment commands and the repository path.
- Updated specifications and repository guidance for Convention 13.
- Expanded user guides with API details, ID limits, timestamp decoding, and storage guidance.
- Documented the custom epoch for Discord timestamp decoding. It does not create official Discord IDs.
- Changed the invalid clock source and sequence overflow error messages.
- Reduced the root README and contributor guidance to convention-required content.

## 12.0.0 — 2026-10-12

### Changed

- Moved library code to `src/` and added matching tests under `tests/`.
- Added user guides, navigation indexes, repository rules, and a runnable example index.
- Expanded user guides with option defaults, ID fields, identity rules, limits, and error actions.
- Updated package metadata, version, contents, license, and dependency lock.
- Added repository ID metadata and v12 specification files.
- Updated ignore rules and removed obsolete Jest result settings.
- Updated validation scripts and the shared test harness to version 12.
- Replaced the CI workflow and added an npm publication workflow with provenance.
- Updated Knit commands and its repository path.
- Updated README and contributor rules to match the v12 conventions.
- Kept the public API and decimal string output unchanged.

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
