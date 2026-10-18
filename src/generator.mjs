import {
  MAX_TIMESTAMP,
  PROCESS_BITS,
  SEQUENCE_BITS,
  SEQUENCE_MASK,
  WORKER_BITS,
} from "./constants.mjs";
import { validateGeneratorOptions } from "./generator-options.mjs";

export function createGenerator(options = {}) {
  const { baseEpoch, worker, processNumber, now } = validateGeneratorOptions(options);

  let lastTimestamp = -1n;
  let sequence = 0n;

  function readTime() {
    const clockValue = now();
    if (typeof clockValue === "number" && !Number.isSafeInteger(clockValue))
      throw new RangeError("current time must be a safe integer or bigint");
    const timestamp = BigInt(clockValue);
    if (timestamp < baseEpoch) throw new RangeError("current time must not be before epoch");
    return timestamp;
  }

  return function generate() {
    let timestamp = readTime();
    if (timestamp < lastTimestamp) timestamp = lastTimestamp;
    let nextSequence;
    if (timestamp === lastTimestamp) {
      if (sequence === SEQUENCE_MASK)
        throw new RangeError(
          "sequence overflow. Retry when the clock returns a greater timestamp.",
        );
      nextSequence = sequence + 1n;
    } else {
      nextSequence = 0n;
    }
    const elapsed = timestamp - baseEpoch;
    if (elapsed > MAX_TIMESTAMP) throw new RangeError("timestamp exceeds Snowflake capacity");
    lastTimestamp = timestamp;
    sequence = nextSequence;
    return (
      (elapsed << (WORKER_BITS + PROCESS_BITS + SEQUENCE_BITS)) |
      (worker << (PROCESS_BITS + SEQUENCE_BITS)) |
      (processNumber << SEQUENCE_BITS) |
      nextSequence
    ).toString();
  };
}
