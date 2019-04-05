const bcrypt = require('bcrypt');

const users = [
  'onalanhu',
  'felixw',
  'amandaa',
  'rachelb',
  'nataliar',
  'igorn',
  'rodthebest',
];

const genHashes = () => {
  const data = users.map((user) => {
    return bcrypt.hash(user.split('').reverse().join(''), 10)
      .then((res) => {
        return {
          username: user,
          password: res,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
  });
  return Promise.all(data);
};

module.exports = {
  up: queryInterface => genHashes().then(res => queryInterface.bulkInsert('users', res, {})),
};
