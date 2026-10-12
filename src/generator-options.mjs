import { DEFAULT_EPOCH } from "./constants.mjs";
import { validateIdentity } from "./validation.mjs";

const defaultNow = () => Date.now();

export function validateGeneratorOptions({
  epoch = DEFAULT_EPOCH,
  workerId = 0,
  processId = process.pid % 32,
  now = defaultNow,
} = {}) {
  const baseEpoch = BigInt(epoch);
  const identity = validateIdentity(workerId, processId);
  if (typeof now !== "function") throw new TypeError("now must be a function");

  return { baseEpoch, ...identity, now };
}
