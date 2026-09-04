export const DEFAULT_EPOCH = 365662380000n;
export const SEQUENCE_BITS = 12n;
export const PROCESS_BITS = 5n;
export const WORKER_BITS = 5n;
export const PROCESS_MASK = (1n << PROCESS_BITS) - 1n;
export const WORKER_MASK = (1n << WORKER_BITS) - 1n;
export const SEQUENCE_MASK = (1n << SEQUENCE_BITS) - 1n;
export const MAX_TIMESTAMP = (1n << 42n) - 1n;

export const constants = Object.freeze({
  epoch: DEFAULT_EPOCH,
  sequenceBits: SEQUENCE_BITS,
  processBits: PROCESS_BITS,
  workerBits: WORKER_BITS,
});
