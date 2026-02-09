// CommonJS example: example.cjs
const generate = require('./index.cjs');
const { createSnowflakeGenerator } = require('./index.cjs');

console.log('Default generate():', generate());

const genWorker2 = createSnowflakeGenerator({ workerId: 2 });
console.log('Worker 2 generate():', genWorker2());

module.exports = generate;
