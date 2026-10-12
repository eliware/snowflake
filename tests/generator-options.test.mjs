import { DEFAULT_EPOCH } from "../src/constants.mjs";
import { validateGeneratorOptions } from "../src/generator-options.mjs";

test("applies defaults and normalizes generator options", () => {
  const options = validateGeneratorOptions();
  expect(options).toMatchObject({
    baseEpoch: DEFAULT_EPOCH,
    worker: 0n,
    processNumber: BigInt(process.pid % 32),
  });
  expect(options.now).toBeInstanceOf(Function);
});

test("converts configured epoch and identity values", () => {
  const now = () => 1000;
  expect(validateGeneratorOptions({ epoch: 1000, workerId: 3, processId: 7, now })).toEqual({
    baseEpoch: 1000n,
    worker: 3n,
    processNumber: 7n,
    now,
  });
});

test("rejects invalid identities and clocks", () => {
  expect(() => validateGeneratorOptions({ workerId: 32 })).toThrow(RangeError);
  expect(() => validateGeneratorOptions({ processId: 32 })).toThrow(RangeError);
  expect(() => validateGeneratorOptions({ epoch: -1 })).toThrow(RangeError);
  expect(() => validateGeneratorOptions({ epoch: -1n })).toThrow(RangeError);
  expect(() => validateGeneratorOptions({ epoch: 1.5 })).toThrow(RangeError);
  expect(() => validateGeneratorOptions({ epoch: Number.MAX_SAFE_INTEGER + 1 })).toThrow(
    RangeError,
  );
  expect(() => validateGeneratorOptions({ now: 1 })).toThrow(TypeError);
});
