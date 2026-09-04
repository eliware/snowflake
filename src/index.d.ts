export interface SnowflakeGeneratorOptions {
  epoch?: number | bigint;
  workerId?: number | bigint;
  processId?: number | bigint;
  now?: () => number | bigint;
}

export interface SnowflakeConstants {
  readonly epoch: bigint;
  readonly sequenceBits: bigint;
  readonly processBits: bigint;
  readonly workerBits: bigint;
}

export function createSnowflakeGenerator(options?: SnowflakeGeneratorOptions): () => string;
export const generate: () => string;
export const snowflake: typeof generate;
export const constants: SnowflakeConstants;
export default generate;
