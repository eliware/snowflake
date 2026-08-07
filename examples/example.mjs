// ESM example: example.mjs
import generate, { createSnowflakeGenerator } from './index.mjs';

console.log('Default generate():', generate());

const genWorker1 = createSnowflakeGenerator({ workerId: 1 });
console.log('Worker 1 generate():', genWorker1());

// Exported generator can be used anywhere in your app to create unique IDs
export default generate;
