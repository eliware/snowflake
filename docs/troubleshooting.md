# Troubleshooting

## Error reference

| Error                                         | Cause                                                | Action                                                           |
| --------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------- |
| `RangeError` for `workerId` or `processId`    | The value is outside `0` through `31`.               | Set an integer from `0` through `31`.                            |
| `TypeError` for `now`                         | The option is not a function.                        | Pass a function that returns Unix time in milliseconds.          |
| `TypeError` for `logger`                      | The logger lacks a required level method.            | Pass a logger with `error`, `warn`, `info`, and `debug` methods. |
| `RangeError` for `epoch`                      | The epoch is outside the supported range.            | Set the epoch from zero through the timestamp limit.             |
| `RangeError` for invalid clock number         | The clock returned a fractional or unsafe number.    | Return a safe integer number or a bigint.                        |
| `RangeError` for time before epoch            | The clock value is lower than `epoch`.               | Set the correct epoch or set the clock source.                   |
| `RangeError` for timestamp capacity           | Elapsed time is greater than the 42-bit limit.       | Use a valid epoch for the required date range.                   |
| `RangeError` for sequence overflow            | The generator created 4096 IDs at one timestamp.     | Retry when the clock returns a greater timestamp.                |
| `TypeError` or `RangeError` during conversion | An option or clock value cannot convert to `BigInt`. | Pass an integer number or bigint value.                          |

## Sequence overflow

The generator does not wait for the clock.
It fails when one timestamp reaches the 4096-ID limit.
Retry when the clock returns a timestamp greater than the last timestamp.
If the clock stalls, check the system clock or the `now` function.

## Duplicate IDs

Give each active generator a unique worker and process ID pair.
Use the same epoch for each generator in one application.
The default worker ID is `0`.
The default process ID is `process.pid % 32` and can repeat across hosts.
Set both IDs in deployment configuration when some hosts create IDs.

Do not create multiple generators with the same pair while their IDs can overlap in time.
Each generator starts its sequence at zero.
Use one generator instance for each pair in a process.

## Clock rollback

The generator keeps IDs in increasing order when its clock returns an earlier time.
It uses the last valid timestamp and advances the sequence.
It logs a warning when you provide a logger.
The clock must return a value at or after the configured epoch.

## Invalid timestamps

The clock must return a safe integer number or a bigint.
The value must be Unix time in milliseconds.
The timestamp must be at or after the configured epoch.
The elapsed time must be 42 bits or less.
Check the clock and epoch values when timestamp validation fails.

## Large ID values

IDs are decimal strings because JavaScript numbers cannot store every ID exactly.
Keep the string in JSON and in database fields that store exact decimal values.
Use `BigInt(id)` for exact integer operations.

## Node.js version

Use Node.js 26 or later.
Check the active version with `node --version`.
