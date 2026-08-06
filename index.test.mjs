import generate, { constants, createSnowflakeGenerator } from './index.mjs';

test('default generator returns positive decimal strings', () => {
  expect(BigInt(generate())).toBeGreaterThan(0n);
});

test('encodes worker, process, timestamp, and sequence', () => {
  const gen = createSnowflakeGenerator({ epoch: 1000n, workerId: 3, processId: 7, now: () => 1000 });
  const first = BigInt(gen());
  const second = BigInt(gen());
  expect((first >> 17n) & 31n).toBe(3n);
  expect((first >> 12n) & 31n).toBe(7n);
  expect(first & 4095n).toBe(0n);
  expect(second & 4095n).toBe(1n);
});

test('clamps a clock rollback', () => {
  let now = 2000;
  const gen = createSnowflakeGenerator({ epoch: 1000, now: () => now });
  const first = BigInt(gen());
  now = 1999;
  const second = BigInt(gen());
  expect(second).toBeGreaterThan(first);
});

test('waits for the next millisecond after sequence overflow', () => {
  let now = 1000;
  let reads = 0;
  const gen = createSnowflakeGenerator({ epoch: 1000, now: () => { reads += 1; return reads > 4097 ? 1001 : now; } });
  for (let i = 0; i < 4097; i += 1) gen();
  expect(BigInt(gen()) >> 22n).toBe(1n);
});

test('rejects timestamps beyond the 42-bit capacity', () => {
  const tooLate = constants.epoch + (1n << 42n);
  expect(() => createSnowflakeGenerator({ epoch: constants.epoch, now: () => tooLate })()).toThrow(RangeError);
});

test('validates configuration and epoch boundaries', () => {
  expect(() => createSnowflakeGenerator({ workerId: 32 })).toThrow(RangeError);
  expect(() => createSnowflakeGenerator({ processId: -1 })).toThrow(RangeError);
  expect(() => createSnowflakeGenerator({ now: 1 })).toThrow(TypeError);
  expect(() => createSnowflakeGenerator({ epoch: 100, now: () => 99 })()).toThrow(RangeError);
  expect(constants.epoch).toBe(365662380000n);
});
