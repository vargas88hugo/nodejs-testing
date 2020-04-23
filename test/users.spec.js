const { findUserByEmail, findUserById } = require('../users');

describe('The findUserByEmail function', () => {
  it('finds a user by email using done', (done) => {
    findUserByEmail('bahdcoder@gmail.com').then((res) => {
      expect(res.message).toEqual('User found successfully.');

      done();
    });
  });

  it('finds a user by email using the return promise', () => {
    return findUserByEmail('bahdcoder@gmail.com').then((res) => {
      expect(res.message).toEqual('User found successfully.');
    });
  });

  it('finds a user by email using async/await', async () => {
    const res = await findUserByEmail('bahdcoder@gmail.com');

    expect(res.message).toEqual('User found successfully.');
  });

  it('rejects with error if user with email was not found', () => {
    const actual = findUserByEmail('custom.com');

    expect(actual).rejects.toEqual(
      new Error('User with email: custom.com was not found.')
    );
  });
});

describe('The findUserById function', () => {
  it('should find a user by id', async () => {
    const res = await findUserById(1);

    expect(res.message).toEqual('User found successfully.');
  });

  it('rejects with error if user is not found by id', () => {
    const actual = findUserById(9999);

    expect(actual).rejects.toEqual(
      new Error('User with id: 9999 was not found.')
    );
  });
});
