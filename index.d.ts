export function createSnowflakeGenerator(options?: { epoch?: number | bigint; workerId?: number }): () => string;
export const generate: () => string;
export default generate;
