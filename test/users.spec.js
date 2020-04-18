const assert = require('assert');

const { findUserByEmail, findUserById } = require('../users');

describe('The findUserByEmail function', () => {
  it('finds a user by email using done', (done) => {
    findUserByEmail('bahdcoder@gmail.com').then((res) => {
      assert.equal(res.message, 'User found successfully.');

      done();
    });
  });

  it('finds a user by email using the return promise', () => {
    return findUserByEmail('bahdcoder@gmail.com').then((res) => {
      assert.equal(res.message, 'User found successfully.');
    });
  });

  it('finds a user by email using async/await', async () => {
    const res = await findUserByEmail('bahdcoder@gmail.com');

    assert.equal(res.message, 'User found successfully.');
  });
});
