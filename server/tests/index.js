/* eslint-env mocha */
process.env.NODE_ENV = 'test';

const Sequelize = require('sequelize');
const app = require('..');
const db = require('../db/models');
const languageSeeder = require('../db/seeders/languageSeeder').up;
const proficiencySeeder = require('../db/seeders/proficiencySeeder').up;
const userSeeder = require('../db/seeders/userSeeder').up;
const routesTests = require('./routes');


describe('Tests', () => {
  before(async () => {
    await db.sequelize.sync({ force: true });
    await languageSeeder(db.sequelize.getQueryInterface(), Sequelize);
    await proficiencySeeder(db.sequelize.getQueryInterface(), Sequelize);
    await userSeeder(db.sequelize.getQueryInterface(), Sequelize);
  });
  describe('Routes', () => routesTests(app));
});
