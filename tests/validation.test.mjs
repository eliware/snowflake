import { PROCESS_MASK, WORKER_MASK } from '../src/constants.mjs';
import { validateIdentity, validatePart } from '../src/validation.mjs';

test('validates identity parts and accepts BigInts', () => {
  expect(validatePart(3n, 'workerId', WORKER_MASK)).toBe(3n);
  expect(validateIdentity(31n, 7n)).toEqual({ worker: 31n, processNumber: 7n });
  expect(() => validatePart(-1, 'processId', PROCESS_MASK)).toThrow(RangeError);
  expect(() => validatePart(32, 'workerId', WORKER_MASK)).toThrow(RangeError);
});
