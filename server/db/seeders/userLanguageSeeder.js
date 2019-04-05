const { flatten } = require('lodash');
const users = [
  {
    name: 1,
    languages: [
      {
        name: 40,
        proficiencyLevel: 3,
        learning: false,
      },
      {
        name: 30,
        proficiencyLevel: 3,
        learning: false,
      },
      {
        name: 148,
        proficiencyLevel: 2,
        learning: true,
      },
    ]
  },
  {
    name: 2,
    languages: [
      {
        name: 51,
        proficiencyLevel: 3,
        learning: false,
      },
      {
        name: 40,
        proficiencyLevel: 3,
        learning: false,
      },
      {
        name: 30,
        proficiencyLevel: 1,
        learning: true,
      },
    ]
  },
  {
    name: 3,
    languages: [
      {
        name: 40,
        proficiencyLevel: 2,
        learning: true,
      },
      {
        name: 128,
        proficiencyLevel: 3,
        learning: false,
      },
    ]
  },
  {
    name: 4,
    languages: [
      {
        name: 40,
        proficiencyLevel: 3,
        learning: false,
      },
      {
        name: 148,
        proficiencyLevel: 2,
        learning: true,
      },
    ]
  },
  {
    name: 5,
    languages: [
      {
        name: 40,
        proficiencyLevel: 2,
        learning: true,
      },
      {
        name: 70,
        proficiencyLevel: 3,
        learning: false,
      },
      {
        name: 52,
        proficiencyLevel: 3,
        learning: false,
      },
    ]
  },
  {
    name: 6,
    languages: [
      {
        name: 169,
        proficiencyLevel: 3,
        learning: false,
      },
      {
        name: 133,
        proficiencyLevel: 3,
        learning: false,
      },
      {
        name: 40,
        proficiencyLevel: 2,
        learning: true,
      },
    ]
  },
  {
    name: 7,
    languages: [
      {
        name: 148,
        proficiencyLevel: 3,
        learning: false,
      },
      {
        name: 40,
        proficiencyLevel: 2,
        learning: true,
      },
    ]
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log(users);
    const data = flatten(users.map(user => {
      return user.languages.map(language => {
        return {
          proficiencyId: language.proficiencyLevel,
          learning: language.learning,
          languageId: language.name,
          userId: user.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      })
    }));

    return queryInterface.bulkInsert('userLanguages', data)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete(People, null, {});
    */
  }
};
