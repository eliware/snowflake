# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

## @eliware/snowflake [![npm version](https://img.shields.io/npm/v/@eliware/snowflake.svg)](https://www.npmjs.com/package/@eliware/snowflake)[![license](https://img.shields.io/github/license/eliware/snowflake.svg)](LICENSE)[![build status](https://github.com/eliware/snowflake/actions/workflows/nodejs.yml/badge.svg)](https://github.com/eliware/snowflake/actions)

> A snowflake for Node.js (Insert Brief Description)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [ESM Example](#esm-example)
  - [CommonJS Example](#commonjs-example)
- [API](#api)
- [TypeScript](#typescript)
- [Testing](#testing)
- [License](#license)

## Features

- Minimal, dependency-light Snowflake ID generator compatible with Discord-style bit layout.
- BigInt-safe implementation to preserve full 64-bit IDs.
- Works in both ESM and CommonJS environments.
- Configurable epoch and worker ID via a factory function.
- Includes TypeScript declarations and basic tests.

## Installation

Install from npm:

```bash
npm install @eliware/snowflake
```

## Usage

### ESM Example

```js
// ESM (index.mjs)
import generate, { createSnowflakeGenerator } from './index.mjs';

// default generator (workerId: 0)
console.log('id:', generate());

// create a generator for a specific worker ID
const gen = createSnowflakeGenerator({ workerId: 1 });
console.log('worker 1 id:', gen());
```

### CommonJS Example

```js
// CommonJS (index.cjs)
const generate = require('./index.cjs');
const { createSnowflakeGenerator } = require('./index.cjs');

console.log('id:', generate());

const gen = createSnowflakeGenerator({ workerId: 2 });
console.log('worker 2 id:', gen());
```

## API

### createSnowflakeGenerator(options?) => () => string

- options.epoch: number | bigint (default: 1420070400000) — base epoch in milliseconds (Discord epoch: 2015-01-01T00:00:00.000Z).
- options.workerId: number (default: 0) — numeric worker/node ID (10-bit value).

Returns a zero-argument function that generates a new Snowflake ID (as a decimal string) each call.

Behavior notes:
- Timestamp uses (Date.now() - epoch) shifted left 22 bits.
- Worker ID occupies 10 bits, sequence counter occupies 12 bits.
- The generator waits for the next millisecond if more than 4095 IDs are requested in the same millisecond.

### Default export: generate()

A ready-to-use generator (workerId 0). It returns a decimal string representation of the Snowflake ID.

## TypeScript

Type definitions are included (index.d.ts). Example signatures:

```ts
export function createSnowflakeGenerator(options?: { epoch?: number | bigint; workerId?: number }): () => string;
export const generate: () => string;
export default generate;
```

## Testing

A small Jest test suite is included (index.test.mjs / index.test.cjs) that verifies:

- Generated IDs are numeric strings parseable to BigInt.
- Consecutive IDs are monotonically increasing.
- Worker ID bits are encoded correctly.
- Timestamp portion decodes to a recent time.

Run tests with:

```bash
npm test
```

---

## Support

For help, questions, or to chat with the author and community, visit:

[![Discord](https://eliware.org/logos/discord_96.png)](https://discord.gg/M6aTR9eTwN)[![eliware.org](https://eliware.org/logos/eliware_96.png)](https://discord.gg/M6aTR9eTwN)

**[eliware.org on Discord](https://discord.gg/M6aTR9eTwN)**

## License

[MIT © 2025 Eli Sterling, eliware.org](LICENSE)

## Links

- [Home Page](https://eliware.org)
- [GitHub](https://github.com/eliware/snowflake)
- [npm](https://www.npmjs.com/package/@eliware/snowflake)
- [Discord](https://discord.gg/M6aTR9eTwN)
