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

Create time-ordered Snowflake IDs with a custom epoch and worker and process IDs.
Return decimal strings so JavaScript and JSON preserve each ID exactly.
The generator keeps IDs ordered when time decreases and reports sequence overflow.

## Requirements

Use Node.js 26 or later.
Use one package instance in each Node.js process.

## Setup

Install the package from npm:

```text
npm install @eliware/snowflake
```

## Usage

Import the generator factory and set a unique worker and process ID pair:

```js
import { createSnowflakeGenerator } from "@eliware/snowflake";

const generate = createSnowflakeGenerator({ workerId: 3, processId: 7 });
console.log(generate());
```

Each call returns one decimal string.

[Release notes](RELEASE_NOTES.md)

[Specifications](specs/README.md)

## Development

[Documentation](docs/README.md)
See the [usage guide](docs/usage.md) for generator options and ID fields.

## Testing

Run `npm test` from a repository clone to run aggregate validation.

## Troubleshooting

Check the options and clock when the generator throws `RangeError`.
For sequence overflow, retry when the clock returns a timestamp greater than the last timestamp.
Read the [troubleshooting guide](docs/troubleshooting.md) for error causes and actions.

## Security

Use IDs as identifiers. Each ID contains its generation time and worker and process values.
Do not use IDs as secrets or authentication tokens.
Read the [usage guide](docs/usage.md) for ID fields and storage guidance.

## API

Import `createSnowflakeGenerator` to create a generator with custom options.
Use `generate`, `snowflake`, or the default export for the default generator.
Read the [usage guide](docs/usage.md) for the API and option details.

## Packaging

The package uses native ESM and includes TypeScript declarations.
The package uses `@eliware/log` for optional structured logging.
Install it from [npm](https://www.npmjs.com/package/@eliware/snowflake).

## Examples

[Run the native ESM example](examples/example.mjs).
[Examples](examples/README.md)

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
