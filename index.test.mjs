import generate, { createSnowflakeGenerator } from './index.mjs';
import { test, expect } from '@jest/globals';

const EPOCH = 1420070400000n;

test('generate() returns a numeric string parseable to BigInt', () => {
  const id = generate();
  expect(typeof id).toBe('string');
  expect(/^[0-9]+$/.test(id)).toBe(true);
  const n = BigInt(id);
  expect(n > 0n).toBe(true);
});

test('consecutive IDs are monotonically increasing', () => {
  const a = BigInt(generate());
  const b = BigInt(generate());
  expect(b > a).toBe(true);
});

test('workerId is encoded correctly', () => {
  const gen = createSnowflakeGenerator({ workerId: 5 });
  const id = BigInt(gen());
  const worker = (id >> 12n) & 0x3ffn;
  expect(worker).toBe(5n);
});

test('timestamp portion decodes to a recent time', () => {
  const id = BigInt(generate());
  const ts = (id >> 22n) + EPOCH;
  const now = BigInt(Date.now());
  // timestamp should be within the last minute
  expect(ts <= now).toBe(true);
  expect(now - ts < 60000n).toBe(true);
});
