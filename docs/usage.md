# Use Snowflake IDs

## Requirements

Use Node.js 26 or later.
Use one package instance in each Node.js process.

## Install

Install the package from npm:

```text
npm install @eliware/snowflake
```

## Create a generator

Import the generator factory and set a unique worker and process ID pair:

```js
import { createSnowflakeGenerator } from "@eliware/snowflake";

const generate = createSnowflakeGenerator({ workerId: 3, processId: 7 });
const id = generate();
console.log(id);
```

The command prints one decimal string. The value changes on each call.

## Set generator options

Pass an options object to `createSnowflakeGenerator`.

| Option      | Type             | Default            | Meaning                                          |
| ----------- | ---------------- | ------------------ | ------------------------------------------------ |
| `epoch`     | number or bigint | `365662380000n`    | Unix epoch in milliseconds.                      |
| `workerId`  | number or bigint | `0`                | Worker value from `0` through `31`.              |
| `processId` | number or bigint | `process.pid % 32` | Process value from `0` through `31`.             |
| `now`       | function         | `Date.now`         | Function that returns Unix time in milliseconds. |
| `logger`    | logger           | none               | Optional structured logger for generator events. |

`createSnowflakeGenerator(options)` returns a function that creates IDs.
Each call returns one decimal string.
Set `epoch` as a safe integer number or a bigint from zero through `(1n << 42n) - 1n`.
Set `workerId` and `processId` to integer values from `0` through `31`.
Use the same epoch for all generators in one application.

Give each active generator a unique pair of `workerId` and `processId` values.
Keep each pair unique while IDs from that pair remain in use.
Set `processId` when some hosts or processes use the same `workerId`.
The default process ID can repeat across hosts.

To align timestamp decoding with Discord, set `epoch` to `1420070400000n`.
This epoch matches Discord's timestamp epoch.
It does not create an official Discord resource ID.

```js
const createDiscordTimeGenerator = createSnowflakeGenerator({
  epoch: 1420070400000n,
  workerId: 3,
  processId: 7,
});
```

## Understand the ID fields

Each ID has a 42-bit timestamp, a 5-bit worker ID, a 5-bit process ID, and a 12-bit sequence.
The timestamp stores milliseconds since the configured epoch.
The sequence starts at zero when the timestamp changes.
The default epoch is `365662380000n`, or `1981-08-03T04:53:00Z`.
The timestamp field sorts before the worker, process, and sequence fields.

The generator combines the fields as follows:

```text
((time - epoch) << 22) | (workerId << 17) | (processId << 12) | sequence
```

The maximum elapsed timestamp is `(1n << 42n) - 1n` milliseconds.
IDs can be greater than JavaScript's safe integer limit.

## Use the default generator

Use `generate`, `snowflake`, or the default export to create IDs.
These exports refer to the same generator instance.
The default generator uses worker ID `0` and process ID `process.pid % 32`.
Create a custom generator to set a different identity, epoch, or clock.

The `constants` export has `epoch`, `sequenceBits`, `processBits`, and `workerBits` fields.
Each field has a `bigint` value.
The sequence, process, and worker fields use 12, 5, and 5 bits.
The `constants` object is frozen.

## Decode an ID timestamp

Convert the ID string to a `bigint` before you read its timestamp field.
Move the value right by 22 bits to read elapsed milliseconds.
Add the configured epoch to get Unix time in milliseconds.
Convert that value to a JavaScript `Date` to get its ISO 8601 value.

```js
const epoch = 365662380000n;
const timestamp = new Date(Number((BigInt(id) >> 22n) + epoch));
console.log(timestamp.toISOString());
```

Use the same epoch that the generator used to create the ID.

## Use a custom clock

Pass `now` to set the clock source.
Return a safe integer number or a bigint from that function.
The value must be Unix time in milliseconds.
Use this option for deterministic tests or a controlled clock source.

## Add structured logging

Install `@eliware/log` to create a logger. Pass the logger to the generator with the `logger` option.
The generator writes records only when you provide a logger.

```js
import { createLogger } from "@eliware/log";
import { createSnowflakeGenerator } from "@eliware/snowflake";

const logger = createLogger({ level: "debug", format: "json" });
const generate = createSnowflakeGenerator({ logger });
const id = generate();
```

The generator writes `info` when it starts, `debug` when it creates an ID, and `warn` when its clock returns an earlier time.
It writes `error` when ID generation fails.
Records do not include generated IDs, credentials, tokens, or error messages.

Records include the operation, component, and related timestamp or identity fields.
The logger supports the `error`, `warn`, `info`, `http`, `verbose`, `debug`, and `silly` levels.
The generator uses only levels that apply to its operations.
Set the logger level to control which records it writes.

## Time and sequence limits

The generator uses the last timestamp when the clock returns a lower value.
The generator sets the sequence to zero when the timestamp changes.
The generator increments the sequence while the timestamp stays the same.

Each generator can create 4096 IDs in one millisecond.
The generator throws `RangeError` after that limit.
Retry when the clock returns a timestamp greater than the last timestamp.
The generator throws `RangeError` for a timestamp before the epoch or greater than its 42-bit limit.

## Store and share IDs

Keep each ID as a decimal string in JavaScript and JSON.
Do not convert an ID to `number`.
JSON cannot encode a `bigint` value without custom code.
Use a text field or an unsigned 64-bit field in a database.
Use `BigInt(id)` for exact integer math in JavaScript.

## Run the example

Use Node.js 26 or later.
Run this command from the repository root:

```text
node examples/example.mjs
```

The command prints two decimal strings. The values depend on the current time and process ID.
The example writes no files.
