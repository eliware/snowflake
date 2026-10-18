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

Use the same epoch for all generators in one application.
Set the epoch to a value from zero through the timestamp limit.
Pass it as a safe integer number or a bigint.
Set `epoch` to `1420070400000n` to decode timestamps with Discord's epoch.

Give each active generator a unique worker and process ID pair.
Set `processId` when some hosts or processes share worker IDs.
The default process ID can repeat across hosts.

## Understand the ID fields

Each ID has a 42-bit timestamp, a 5-bit worker ID, a 5-bit process ID, and a 12-bit sequence.
The timestamp stores milliseconds since the configured epoch.
The sequence starts at zero when the timestamp advances.
The default epoch is `365662380000n`, or `1981-08-03T04:53:00Z`.

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

## Use a custom clock

Pass `now` to set the clock source.
Return a safe integer number or a bigint from that function.
The value must be Unix time in milliseconds.
Use this option for deterministic tests or a controlled clock source.

## Time and sequence limits

The generator uses the last timestamp when the clock returns a lower value.
It increments the sequence while that timestamp remains active.
Each generator can create 4096 IDs in one millisecond.
The generator throws `RangeError` after that limit.
Retry when the clock returns a later millisecond.
The generator throws `RangeError` for a timestamp before the epoch or greater than its 42-bit limit.

## Store and share IDs

Keep each ID as a decimal string in JavaScript and JSON.
Do not convert an ID to `number`.
Use a text field or an unsigned 64-bit field in a database.
Use `BigInt(id)` for exact integer math in JavaScript.

## Run the example

Use Node.js 26 or later. Run this command from the repository root:

```text
node examples/example.mjs
```

The command prints two decimal strings. The values depend on the current time and process ID.
The example writes no files.
