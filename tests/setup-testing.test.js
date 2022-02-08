const sum = require('./setup-testing');

test('Simple sum function test to ensure Jest testing is setup', () => {
  expect(sum(1, 2)).toBe(3);
})