# @eliware/snowflake

[![npm version](https://img.shields.io/npm/v/@eliware/snowflake.svg)](https://www.npmjs.com/package/@eliware/snowflake) [![build status](https://github.com/eliware/snowflake/actions/workflows/nodejs.yml/badge.svg)](https://github.com/eliware/snowflake/actions)

A production-ready, BigInt-safe Snowflake ID generator for Node.js. IDs are returned as decimal strings so they remain safe across JSON, databases, and JavaScript runtimes.

## Features

- Custom epoch; the default is `365662380000n` (`1981-08-03T04:53:00Z`).
- 42-bit millisecond timestamp, 5-bit worker ID, 5-bit process ID, and 12-bit sequence.
- Clock rollback protection and sequence overflow handling.
- Sequence overflow fails fast; callers can retry after the clock advances.
- Configurable worker/process identity for distributed deployments.
- Injectable clock for deterministic tests.
- Range validation and timestamp-capacity checks.
- Native ESM, TypeScript declarations, and no runtime dependencies.

## Requirements

- Node.js 26 or newer

## Installation

```bash
npm install @eliware/snowflake
```

## Usage

```js
import generate, { createSnowflakeGenerator } from '@eliware/snowflake';

console.log(generate());

// Set a unique worker ID for each replica or node.
const replicaGenerator = createSnowflakeGenerator({
  workerId: 3,
  processId: 7,
});
console.log(replicaGenerator());
```

For Kubernetes, assign each replica a stable `workerId` from configuration. `processId` defaults to `process.pid % 32`, but should be explicitly configured when process identity must be coordinated across hosts.

## API

`createSnowflakeGenerator(options?)` returns a function that generates decimal-string IDs.

| Option | Default | Description |
| --- | --- | --- |
| `epoch` | `365662380000n` | Unix epoch in milliseconds. |
| `workerId` | `0` | Worker/node ID, from `0` to `31`. |
| `processId` | `process.pid % 32` | Process ID, from `0` to `31`. |
| `now` | `Date.now` | Injectable millisecond clock. |

The exports `generate` and `snowflake` are ready-to-use default generators. `constants` exposes the bit layout and default epoch.

## TypeScript

TypeScript declarations are included for all public exports and options.

## Errors / Troubleshooting

Configuration values outside the supported ranges throw `RangeError`; a non-function clock throws `TypeError`; timestamps before the epoch or beyond Snowflake capacity throw `RangeError`. Configure unique `workerId` and `processId` values across distributed generators.

## Testing and linting

```bash
npm test
npm run lint
npm run typecheck
npm run audit
npm run pack
```

## Security

Snowflake IDs are unique identifiers, not secrets. Do not use them as authentication tokens or assume they conceal timestamp and deployment information.

## License

MIT © Eli Sterling, eliware.org
