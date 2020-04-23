const add = require('../add');

describe('The add function', () => {
  it('adds two numbers', () => {
    const result = add(1, 3);
    const expected = 4;

    expect(result).toBe(expected);
  });
});
