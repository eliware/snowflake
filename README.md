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

Create time-ordered Snowflake IDs as decimal strings.
Set a custom epoch, worker ID, process ID, clock, or logger.

## Requirements

Use Node.js 26 or later.
Use native ECMAScript modules (ESM).

## Setup

Install the package from npm:

```text
npm install @eliware/snowflake
```

## Usage

Create a generator with a unique worker and process ID pair:

```js
import { createSnowflakeGenerator } from "@eliware/snowflake";

const generate = createSnowflakeGenerator({ workerId: 3, processId: 7 });
console.log(generate());
```

Each call returns one decimal string.
Read the [usage guide](docs/usage.md) for generator options and ID fields.
Read the [release notes](RELEASE_NOTES.md) for changes by version.
Read the [specifications index](specs/README.md) for repository requirements.

## Development

Read the [documentation index](docs/README.md) for maintained guides.

## Testing

Run `npm test` from a repository clone for aggregate validation.

## Troubleshooting

Read the [troubleshooting guide](docs/troubleshooting.md) for error causes and actions.

## Security

Each ID contains its generation time and identity fields.
Do not use IDs as secrets or authentication tokens.

## API

Import `createSnowflakeGenerator` to create a generator with custom options.
Import `generate`, `snowflake`, or the default export to use the default generator.
Import `constants` to read the default epoch and field sizes.
Read the [usage guide](docs/usage.md) for API details and TypeScript declarations.

## Packaging

The package uses native ESM, includes TypeScript declarations, and depends on `@eliware/log`.
Its root entrypoint is `src/index.mjs` and its declaration file is `src/index.d.ts`.
The npm package includes these paths from `package.json`:

- `src/`
- `docs/`
- `README.md`, `AGENTS.md`, `LICENSE`, and `RELEASE_NOTES.md`
- `examples/` and `specs/`

Use numeric `MAJOR.MINOR.PATCH` versions.
Push a matching `v<version>` tag to start validation and npm publication.
Follow the approved release procedure before you create a release tag.

## Examples

Run `node examples/example.mjs` to create sample IDs.
Read [examples/README.md](examples/README.md) for the example index.

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
