const add = require('../add');
const assert = require('assert');

describe('The add function', () => {
  it('adds two numbers', () => {
    const result = add(1, 3);
    const expected = 4;

    assert.equal(result, expected);
  });
});
