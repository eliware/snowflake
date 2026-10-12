# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

## @eliware/snowflake [![npm](https://img.shields.io/npm/v/@eliware/snowflake)](https://www.npmjs.com/package/@eliware/snowflake) [![License](https://img.shields.io/github/license/eliware/snowflake)](https://github.com/eliware/snowflake/blob/main/LICENSE) [![CI](https://github.com/eliware/snowflake/actions/workflows/ci.yaml/badge.svg)](https://github.com/eliware/snowflake/actions/workflows/ci.yaml)

A Node.js Snowflake ID generator with BigInt support and a configurable epoch.

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

Create time-ordered IDs with a custom epoch and unique worker and process IDs.
The IDs use the Discord Snowflake bit layout.
Receive decimal strings that preserve every ID bit in JavaScript and JSON.
The generator handles clock rollback and reports sequence overflow.

## Requirements

Use Node.js 26 or later.
Assign a unique worker and process ID pair to each active generator.

## Setup

Install the package:

```text
npm install @eliware/snowflake
```

## Usage

Create a generator with a unique identity:

```js
import { createSnowflakeGenerator } from "@eliware/snowflake";

const generate = createSnowflakeGenerator({ workerId: 3, processId: 7 });
console.log(generate());
```

See [release notes](RELEASE_NOTES.md) for changes by version.
See the [usage guide](docs/usage.md) for options, ID fields, and limits.

## Development

Read [user documentation](docs/README.md), [examples](examples/README.md), and [specifications](specs/README.md).

## Testing

Run `npm test` for all required checks.
Run `npm run lint`, `npm run format:check`, `npm run audit`, `npm run typecheck`, or `npm run pack` for focused checks.

## Troubleshooting

See [troubleshooting](docs/troubleshooting.md) for error causes and recovery steps.

## Security

Treat IDs as identifiers, not secrets.
IDs reveal timestamp and deployment data.
Do not use IDs as authentication tokens.

## API

`createSnowflakeGenerator(options)` returns a function that creates decimal-string IDs.
Options set the epoch, worker ID, process ID, and clock.
The default generator is `generate`, `snowflake`, and the default export.
The `constants` export provides the default epoch and bit sizes.

## Packaging

The package provides native ESM code and TypeScript declarations.
It has no runtime dependencies.

## Examples

Run the [native ESM example](examples/example.mjs) with Node.js 26 or later.

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
