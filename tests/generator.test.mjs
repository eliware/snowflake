import { createGenerator } from "../src/generator.mjs";
import { jest } from "@jest/globals";
import { MAX_TIMESTAMP } from "../src/constants.mjs";

test("generates encoded IDs and sequence values", () => {
  const gen = createGenerator({ epoch: 1000n, workerId: 3, processId: 7, now: () => 1000 });
  const first = BigInt(gen());
  const second = BigInt(gen());
  expect((first >> 17n) & 31n).toBe(3n);
  expect((first >> 12n) & 31n).toBe(7n);
  expect(first & 4095n).toBe(0n);
  expect(second & 4095n).toBe(1n);
});

test("uses default options when no options are supplied", () => {
  expect(createGenerator()()).toMatch(/^\d+$/);
});

test("supports the full elapsed timestamp range with the maximum epoch", () => {
  const epoch = MAX_TIMESTAMP;
  const gen = createGenerator({ epoch, now: () => epoch + MAX_TIMESTAMP });

  expect(BigInt(gen()) >> 22n).toBe(MAX_TIMESTAMP);
});

test("protects rollback and rejects invalid timestamps", () => {
  let now = 2000;
  const gen = createGenerator({ epoch: 1000, now: () => now });
  const first = BigInt(gen());
  now = 1999;
  expect(BigInt(gen())).toBeGreaterThan(first);
  expect(() => createGenerator({ epoch: 100, now: () => 99 })()).toThrow(RangeError);
  expect(() => createGenerator({ epoch: 100n, now: () => 100n + (1n << 42n) })()).toThrow(
    RangeError,
  );
  expect(() => createGenerator({ epoch: 1000, now: () => 1000.5 })()).toThrow(
    "current time must be a safe integer or bigint",
  );
  expect(() => createGenerator({ epoch: 0, now: () => 0 })()).not.toThrow();
});

test("fails fast on sequence overflow", () => {
  let now = 1000;
  const gen = createGenerator({ epoch: 1000, now: () => now });
  for (let i = 0; i < 4096; i += 1) gen();
  expect(() => gen()).toThrow(
    "sequence overflow. Retry when the clock returns a greater timestamp.",
  );
  expect(() => gen()).toThrow(
    "sequence overflow. Retry when the clock returns a greater timestamp.",
  );
  now = 1000.5;
  expect(() => gen()).toThrow("current time must be a safe integer or bigint");
  now = 1001;
  expect(BigInt(gen()) & 4095n).toBe(0n);
});

test("keeps generator state after a timestamp capacity error", () => {
  let now = 1000n;
  const gen = createGenerator({ epoch: 1000n, now: () => now });
  const first = BigInt(gen());
  const second = BigInt(gen());
  now = 1001n + (1n << 42n);
  expect(() => gen()).toThrow("timestamp exceeds Snowflake capacity");
  now = 1000n;
  const third = BigInt(gen());
  expect(third).toBeGreaterThan(second);
  expect(third & 4095n).toBe(2n);
  expect(first).toBeLessThan(second);
});

test("writes structured records to an injected logger", () => {
  const logger = Object.fromEntries(
    ["error", "warn", "info", "debug"].map((level) => [level, jest.fn()]),
  );
  const gen = createGenerator({ epoch: 1000n, workerId: 3, processId: 7, now: () => 1000, logger });

  const id = gen();

  expect(logger.info).toHaveBeenCalledWith("Snowflake generator created", {
    component: "snowflake",
    operation: "create-generator",
    epoch: "1000",
    workerId: "3",
    processId: "7",
  });
  expect(logger.debug).toHaveBeenCalledWith("Snowflake ID generated", {
    component: "snowflake",
    operation: "generate",
    timestamp: "1000",
    sequence: "0",
  });
  expect(JSON.stringify(logger.debug.mock.calls)).not.toContain(id);
});

test("logs clock rollbacks and generation errors without values", () => {
  let now = 1001;
  const logger = Object.fromEntries(
    ["error", "warn", "info", "debug"].map((level) => [level, jest.fn()]),
  );
  const gen = createGenerator({ epoch: 1000n, now: () => now, logger });
  gen();
  now = 1000;
  gen();
  expect(logger.warn).toHaveBeenCalledWith("Snowflake clock moved backward", {
    component: "snowflake",
    operation: "generate",
    event: "clock-rollback",
    timestamp: "1000",
    lastTimestamp: "1001",
  });

  now = 1001;
  for (let index = 0; index < 4094; index += 1) gen();
  expect(() => gen()).toThrow(RangeError);
  expect(logger.error).toHaveBeenCalledWith("Snowflake ID generation failed", {
    component: "snowflake",
    operation: "generate",
    errorType: "RangeError",
  });
});
