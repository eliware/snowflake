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

The program prints one decimal string. The value changes on each call.

## Set generator options

Pass an options object to `createSnowflakeGenerator`.

| Option      | Type             | Default            | Meaning                                          |
| ----------- | ---------------- | ------------------ | ------------------------------------------------ |
| `epoch`     | number or bigint | `365662380000n`    | Unix epoch in milliseconds.                      |
| `workerId`  | number or bigint | `0`                | Worker value from `0` through `31`.              |
| `processId` | number or bigint | `process.pid % 32` | Process value from `0` through `31`.             |
| `now`       | function         | `Date.now`         | Function that returns Unix time in milliseconds. |

Use the same epoch for all generators that create IDs for one application.
Set the epoch from zero through the timestamp limit.
Pass it as a safe integer number or a bigint.
Assign a unique worker and process ID pair to each active generator.
Set `processId` when several hosts or processes share worker IDs.
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
IDs can exceed JavaScript's safe integer range.

## Use the default generator

Use `generate`, `snowflake`, or the default export to create IDs.
These exports refer to the same generator instance.
The default generator uses worker ID `0` and process ID `process.pid % 32`.
Create a custom generator when you need a different identity, epoch, or clock.

## Use a custom clock

Pass `now` to set the clock source.
Return a safe integer number or a bigint from that function.
The value must be Unix time in milliseconds.
Use this option for deterministic tests or a controlled clock source.

## Handle time and sequence limits

The generator uses the last timestamp when the clock moves backward.
It increments the sequence while that timestamp remains active.
Each generator can create up to 4096 IDs for one millisecond.
The next call throws `RangeError` until the clock advances past the last timestamp.
Wait for the clock to advance before retry.
The generator throws `RangeError` for a timestamp before the epoch or beyond its 42-bit limit.

## Store and transfer IDs

Keep each ID as a decimal string in JavaScript and JSON.
Do not convert an ID to `number`.
Use a text field or an unsigned 64-bit field in a database.
Use `BigInt(id)` when you need exact integer math in JavaScript.

## Run the example

Use Node.js 26 or later. Run this command from the repository root:

```text
node examples/example.mjs
```

The command prints two decimal strings. The values depend on the current time and process ID.
You do not need cleanup.
