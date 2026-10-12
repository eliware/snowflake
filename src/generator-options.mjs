import { DEFAULT_EPOCH } from "./constants.mjs";
import { validateIdentity } from "./validation.mjs";

const defaultNow = () => Date.now();

export function validateGeneratorOptions({
  epoch = DEFAULT_EPOCH,
  workerId = 0,
  processId = process.pid % 32,
  now = defaultNow,
} = {}) {
  if (typeof epoch === "number" && !Number.isSafeInteger(epoch))
    throw new RangeError("epoch must be a nonnegative safe integer or bigint");
  const baseEpoch = BigInt(epoch);
  if (baseEpoch < 0n) throw new RangeError("epoch must be a nonnegative safe integer or bigint");
  const identity = validateIdentity(workerId, processId);
  if (typeof now !== "function") throw new TypeError("now must be a function");

  return { baseEpoch, ...identity, now };
}
