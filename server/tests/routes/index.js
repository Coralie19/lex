/* eslint-env mocha */
const usersRoutesTests = require('./users.js');
const languagesRoutesTests = require('./languages.js');

module.exports = (app) => {
  describe('Users', () => usersRoutesTests(app));
  describe('Languages', () => languagesRoutesTests(app));
};
