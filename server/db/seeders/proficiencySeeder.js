module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('proficiencies', [
      {
        name: 'Beginner',
        level: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Conversational',
        level: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fluent',
        level: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
