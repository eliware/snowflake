import {
  DEFAULT_EPOCH,
  MAX_TIMESTAMP,
  PROCESS_BITS,
  SEQUENCE_BITS,
  SEQUENCE_MASK,
  WORKER_BITS,
} from './constants.mjs';
import { validateIdentity } from './validation.mjs';

const defaultNow = () => Date.now();

export function createGenerator({
  epoch = DEFAULT_EPOCH,
  workerId = 0,
  processId = process.pid % 32,
  now = defaultNow,
} = {}) {
  const baseEpoch = BigInt(epoch);
  const { worker, processNumber } = validateIdentity(workerId, processId);
  if (typeof now !== 'function') throw new TypeError('now must be a function');

  let lastTimestamp = -1n;
  let sequence = 0n;

  function readTime() {
    const timestamp = BigInt(now());
    if (timestamp < baseEpoch) throw new RangeError('current time must not be before epoch');
    return timestamp;
  }

  return function generate() {
    let timestamp = readTime();
    if (timestamp < lastTimestamp) timestamp = lastTimestamp;
    if (timestamp === lastTimestamp) {
      sequence = (sequence + 1n) & SEQUENCE_MASK;
      if (sequence === 0n) throw new RangeError('sequence overflow; clock must advance before retrying');
    } else {
      sequence = 0n;
    }
    const elapsed = timestamp - baseEpoch;
    if (elapsed > MAX_TIMESTAMP) throw new RangeError('timestamp exceeds Snowflake capacity');
    lastTimestamp = timestamp;
    return ((elapsed << (WORKER_BITS + PROCESS_BITS + SEQUENCE_BITS)) |
      (worker << (PROCESS_BITS + SEQUENCE_BITS)) |
      (processNumber << SEQUENCE_BITS) |
      sequence).toString();
  };
}
