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

  it('rejects with error if user with email was not found', () => {
    return findUserByEmail('asdasd@asdasd.com').then(
      () => {
        assert.fail('Expected findUserByEmail function to reject.');
      },
      (error) => {
        assert.equal(
          error.message,
          'User with email: asdasd@asdasd.com was not found.'
        );
      }
    );
  });
});

describe('The findUserById function', () => {
  it('should find a user by id', async () => {
    const res = await findUserById(1);

    assert.equal(res.message, 'User found successfully.');
  });

  it('rejects with error if user is not found by id', () => {
    return findUserById(90).then(
      () => {
        assert.fail('Expected findUserById function to throw');
      },
      (error) => {
        assert.equal(error.message, 'User with id: 90 was not found.');
      }
    );
  });
});
