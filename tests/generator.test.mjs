import { DEFAULT_EPOCH, constants } from '../src/constants.mjs';
import { createGenerator } from '../src/generator.mjs';

test('generates encoded IDs and sequence values', () => {
  const gen = createGenerator({ epoch: 1000n, workerId: 3, processId: 7, now: () => 1000 });
  const first = BigInt(gen());
  const second = BigInt(gen());
  expect((first >> 17n) & 31n).toBe(3n);
  expect((first >> 12n) & 31n).toBe(7n);
  expect(first & 4095n).toBe(0n);
  expect(second & 4095n).toBe(1n);
});

test('protects rollback and validates clock and capacity', () => {
  let now = 2000;
  const gen = createGenerator({ epoch: 1000, now: () => now });
  const first = BigInt(gen()); now = 1999;
  expect(BigInt(gen())).toBeGreaterThan(first);
  expect(() => createGenerator({ now: 1 })).toThrow(TypeError);
  expect(() => createGenerator({ epoch: 100, now: () => 99 })()).toThrow(RangeError);
  expect(() => createGenerator({ epoch: DEFAULT_EPOCH, now: () => DEFAULT_EPOCH + (1n << 42n) })()).toThrow(RangeError);
  expect(() => createGenerator({ epoch: 0, now: () => 0 })()).not.toThrow();
  expect(constants.epoch).toBe(DEFAULT_EPOCH);
});

test('fails fast on sequence overflow', () => {
  const gen = createGenerator({ epoch: 1000, now: () => 1000 });
  for (let i = 0; i < 4096; i += 1) gen();
  expect(() => gen()).toThrow('sequence overflow; clock must advance before retrying');
});
