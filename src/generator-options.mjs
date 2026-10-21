import { DEFAULT_EPOCH, MAX_TIMESTAMP } from "./constants.mjs";
import { validateIdentity } from "./validation.mjs";

const defaultNow = () => Date.now();

export function validateGeneratorOptions({
  epoch = DEFAULT_EPOCH,
  workerId = 0,
  processId = process.pid % 32,
  now = defaultNow,
  logger,
} = {}) {
  if (typeof epoch === "number" && !Number.isSafeInteger(epoch))
    throw new RangeError("epoch must be between 0 and the timestamp limit");
  const baseEpoch = BigInt(epoch);
  if (baseEpoch < 0n || baseEpoch > MAX_TIMESTAMP)
    throw new RangeError("epoch must be between 0 and the timestamp limit");
  const identity = validateIdentity(workerId, processId);
  if (typeof now !== "function") throw new TypeError("clock source must be a function");
  if (
    logger !== undefined &&
    (!logger ||
      ["error", "warn", "info", "debug"].some((level) => typeof logger[level] !== "function"))
  )
    throw new TypeError("logger must provide error, warn, info, and debug methods");

  return { baseEpoch, ...identity, now, logger };
}
