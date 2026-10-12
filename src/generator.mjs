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
    const timestamp = BigInt(now());
    if (timestamp < baseEpoch) throw new RangeError("current time must not be before epoch");
    return timestamp;
  }

  return function generate() {
    let timestamp = readTime();
    if (timestamp < lastTimestamp) timestamp = lastTimestamp;
    if (timestamp === lastTimestamp) {
      sequence = (sequence + 1n) & SEQUENCE_MASK;
      if (sequence === 0n)
        throw new RangeError("sequence overflow; clock must advance before retrying");
    } else {
      sequence = 0n;
    }
    const elapsed = timestamp - baseEpoch;
    if (elapsed > MAX_TIMESTAMP) throw new RangeError("timestamp exceeds Snowflake capacity");
    lastTimestamp = timestamp;
    return (
      (elapsed << (WORKER_BITS + PROCESS_BITS + SEQUENCE_BITS)) |
      (worker << (PROCESS_BITS + SEQUENCE_BITS)) |
      (processNumber << SEQUENCE_BITS) |
      sequence
    ).toString();
  };
}
