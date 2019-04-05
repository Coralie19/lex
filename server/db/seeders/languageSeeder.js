'use strict';

const fs = require('fs');
const path = require('path');

function getLanguages() {
  const obj = JSON.parse(fs.readFileSync(path.join(__dirname, 'languages.json'), 'utf-8'));
  return obj;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    const languages = Object.entries(getLanguages()).map((entry) => {
      return {
        name: entry[1],
        isoCode: entry[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    return queryInterface.bulkInsert('languages', languages, {});
  },

  down: (queryInterface, Sequelize) => {
  },
};
