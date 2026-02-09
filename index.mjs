// Snowflake generator (ESM)
const DEFAULT_EPOCH = 1420070400000n; // Discord epoch: 2015-01-01T00:00:00.000Z

export function createSnowflakeGenerator({ epoch = DEFAULT_EPOCH, workerId = 0 } = {}) {
  const _epoch = BigInt(epoch);
  const _workerId = BigInt(workerId) & 0x3ffn; // 10 bits
  let lastTimestamp = 0n;
  let sequence = 0n;

  return function generate() {
    let now = BigInt(Date.now());

    if (now === lastTimestamp) {
      sequence = (sequence + 1n) & 0xfffn; // 12 bits
      if (sequence === 0n) {
        // Sequence overflow in the same millisecond — wait for next ms
        while (now <= lastTimestamp) {
          now = BigInt(Date.now());
        }
      }
    } else {
      sequence = 0n;
    }

    lastTimestamp = now;

    const id = ((now - _epoch) << 22n) | (_workerId << 12n) | sequence;
    return id.toString();
  };
}

// Default generator (workerId 0)
export const generate = createSnowflakeGenerator();
export default generate;
