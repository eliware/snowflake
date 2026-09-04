import { constants, DEFAULT_EPOCH, SEQUENCE_BITS } from '../src/constants.mjs';

test('exports the Snowflake layout constants', () => {
  expect(DEFAULT_EPOCH).toBe(365662380000n);
  expect(SEQUENCE_BITS).toBe(12n);
  expect(constants).toEqual({ epoch: DEFAULT_EPOCH, sequenceBits: 12n, processBits: 5n, workerBits: 5n });
});
