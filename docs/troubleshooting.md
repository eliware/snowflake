# Troubleshooting

## Error reference

| Error                                         | Cause                                                | Action                                                          |
| --------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| `RangeError` for `workerId` or `processId`    | The value is outside `0` through `31`.               | Set an integer from `0` through `31`.                           |
| `TypeError` for `now`                         | The option is not a function.                        | Pass a function that returns Unix time in milliseconds.         |
| `RangeError` for `epoch`                      | The epoch is outside the supported range.            | Set the epoch from zero through the timestamp limit.            |
| `RangeError` for invalid clock number         | The clock returned a fractional or unsafe number.    | Return a safe integer number or a bigint.                       |
| `RangeError` for time before epoch            | The clock value is lower than `epoch`.               | Set the correct epoch or fix the clock source.                  |
| `RangeError` for timestamp capacity           | Elapsed time is greater than the 42-bit limit.       | Use a valid epoch for the required date range.                  |
| `RangeError` for sequence overflow            | The generator created 4096 IDs at one timestamp.     | Wait until the clock moves past the last timestamp, then retry. |
| `TypeError` or `RangeError` during conversion | An option or clock value cannot convert to `BigInt`. | Pass an integer number or bigint value.                         |

## Sequence overflow

The generator does not wait for the clock.
It fails when one timestamp reaches the 4096-ID limit.
Wait until the clock moves past the last timestamp before you retry.
If the clock stalls, check the system clock or the `now` function.

## Duplicate IDs

Assign a unique worker and process ID pair to each active generator.
Use the same epoch for each generator in one application.
The default worker ID is `0`.
The default process ID is `process.pid % 32` and can repeat across hosts.
Set both IDs through deployment configuration when several hosts create IDs.

## Invalid timestamps

The clock must return a safe integer number or a bigint.
The value must be Unix time in milliseconds.
The timestamp must be at or after the configured epoch.
The elapsed time must fit in 42 bits.
Check the clock and epoch values when timestamp validation fails.

## Large ID values

IDs are decimal strings because JavaScript numbers cannot represent every ID exactly.
Keep the string in JSON and in database fields that preserve exact decimal values.
Use `BigInt(id)` for exact integer operations.

## Node.js version

Use Node.js 26 or later.
Check the active version with `node --version`.
