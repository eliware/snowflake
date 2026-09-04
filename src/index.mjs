import { constants } from './constants.mjs';
import { createGenerator } from './generator.mjs';

export const createSnowflakeGenerator = createGenerator;
export const generate = createGenerator();
export const snowflake = generate;
export { constants };
export default generate;
