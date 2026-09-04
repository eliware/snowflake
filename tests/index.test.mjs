import generate, { constants, createSnowflakeGenerator, snowflake } from '../src/index.mjs';

test('composes the public API and aliases', () => {
  expect(typeof generate()).toBe('string');
  expect(snowflake).toBe(generate);
  expect(createSnowflakeGenerator).toBeInstanceOf(Function);
  expect(constants).toHaveProperty('epoch');
});
