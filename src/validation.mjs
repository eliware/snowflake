import { PROCESS_MASK, WORKER_MASK } from './constants.mjs';

export function validatePart(value, name, mask) {
  const parsed = BigInt(value);
  if (parsed < 0n || parsed > mask) {
    throw new RangeError(`${name} must be between 0 and ${mask}`);
  }
  return parsed;
}

export function validateIdentity(workerId, processId) {
  return {
    worker: validatePart(workerId, 'workerId', WORKER_MASK),
    processNumber: validatePart(processId, 'processId', PROCESS_MASK),
  };
}
