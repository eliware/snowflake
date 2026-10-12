# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

## @eliware/snowflake [![npm](https://img.shields.io/npm/v/@eliware/snowflake)](https://www.npmjs.com/package/@eliware/snowflake) [![License](https://img.shields.io/github/license/eliware/snowflake)](https://github.com/eliware/snowflake/blob/main/LICENSE) [![CI](https://github.com/eliware/snowflake/actions/workflows/ci.yaml/badge.svg)](https://github.com/eliware/snowflake/actions/workflows/ci.yaml)

A minimal Node.js Snowflake ID generator (Discord-compatible). Provides BigInt-safe generators with configurable epoch and worker ID.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Security](#security)
- [API](#api)
- [Packaging](#packaging)
- [Examples](#examples)
- [Support](#support)
- [Links](#links)
- [License](#license)

## Features

Create unique, time-ordered IDs with a configurable epoch and machine identity.
The generator returns decimal strings that preserve all ID bits in JavaScript and JSON.
It protects against clock rollback and reports sequence overflow.

## Requirements

Use Node.js 26 or later.
Assign a unique worker and process ID pair to each active generator.

## Setup

Install the package from npm:

```text
npm install @eliware/snowflake
```

## Usage

Create a generator with a stable identity:

```js
import { createSnowflakeGenerator } from "@eliware/snowflake";

const generate = createSnowflakeGenerator({ workerId: 3, processId: 7 });
console.log(generate());
```

The default epoch is `365662380000n`. Configure `processId` when identity must remain unique across hosts.
See [release notes](RELEASE_NOTES.md) for changes by version.

## Development

Install locked dependencies with `npm ci`.
Use native ESM and keep implementation modules under `src/`.
Read [documentation](docs/README.md) and [specifications](specs/README.md) before changes.

## Testing

Run `npm test` for all required checks.
Run `npm run lint`, `npm run format:check`, `npm run audit`, `npm run typecheck`, or `npm run pack` for focused checks.
Run `npm run format` to format maintained files.

## Troubleshooting

The generator throws `RangeError` for invalid IDs, timestamps, or sequence overflow.
Retry sequence overflow after the clock advances.
See [troubleshooting](docs/troubleshooting.md) for more details.

## Security

Treat IDs as identifiers, not secrets.
IDs expose time and deployment information.
Do not use IDs as authentication tokens.

## API

`createSnowflakeGenerator(options)` returns a function that creates decimal-string IDs.
Options are `epoch`, `workerId`, `processId`, and `now`.
The default generator is exported as `generate`, `snowflake`, and the default export.
The `constants` export provides the default epoch and bit sizes.

## Packaging

The package provides native ESM code and TypeScript declarations.
It has no runtime dependencies.
The package supports Node.js 26 and later.

## Examples

Run the [native ESM example](examples/example.mjs) with Node.js 26 or later.
See [examples](examples/README.md) for the example index.

## Support

For help, questions, or to chat with the author and community, visit:

[![Discord](https://eliware.org/logos/discord_96.png)](https://discord.gg/M6aTR9eTwN)[![eliware.org](https://eliware.org/logos/eliware_96.png)](https://discord.gg/M6aTR9eTwN)

**[eliware.org on Discord](https://discord.gg/M6aTR9eTwN)**

## Links

- [Home Page](https://eliware.org)
- [GitHub Org](https://github.com/eliware)
- [GitHub Repo](https://github.com/eliware/snowflake)
- [Bug Reports](https://github.com/eliware/snowflake/issues)
- [npm](https://www.npmjs.com/package/@eliware/snowflake)
- [Discord](https://discord.gg/M6aTR9eTwN)

## License

[MIT © Eliware](LICENSE)
