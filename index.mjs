/**
 * BigInt-safe Snowflake ID generation.
 *
 * Layout (least significant bit first):
 *   sequence: 12 bits
 *   process:    5 bits
 *   worker:     5 bits
 *   timestamp: 42 bits
 */
const DEFAULT_EPOCH = 365662380000n; // 1981-08-03T04:53:00.000Z (fixed EST input)
const SEQUENCE_BITS = 12n;
const PROCESS_BITS = 5n;
const WORKER_BITS = 5n;
const PROCESS_MASK = (1n << PROCESS_BITS) - 1n;
const WORKER_MASK = (1n << WORKER_BITS) - 1n;
const SEQUENCE_MASK = (1n << SEQUENCE_BITS) - 1n;
const MAX_TIMESTAMP = (1n << 42n) - 1n;

const defaultNow = () => Date.now();

function validatePart(value, name, mask) {
  const parsed = BigInt(value);
  if (parsed < 0n || parsed > mask) {
    throw new RangeError(`${name} must be between 0 and ${mask}`);
  }
  return parsed;
}

/**
 * Create a generator. Configure a unique workerId per replica and processId
 * per process when generating IDs from multiple instances.
 */
export function createSnowflakeGenerator({
  epoch = DEFAULT_EPOCH,
  workerId = 0,
  processId = process.pid % 32,
  now = defaultNow,
} = {}) {
  const baseEpoch = BigInt(epoch);
  const worker = validatePart(workerId, 'workerId', WORKER_MASK);
  const processNumber = validatePart(processId, 'processId', PROCESS_MASK);
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
      if (sequence === 0n) {
        do timestamp = readTime(); while (timestamp <= lastTimestamp);
      }
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

export const generate = createSnowflakeGenerator();
export const snowflake = generate;
export const constants = Object.freeze({
  epoch: DEFAULT_EPOCH,
  sequenceBits: SEQUENCE_BITS,
  processBits: PROCESS_BITS,
  workerBits: WORKER_BITS,
});

export default generate;
