const { proficiency: Proficiency } = require('../db/models');
const { filterProps } = require('../utils/index');

exports.getAll = async (req, res) => {
  const proficiencies = await Proficiency.findAll();
  const filteredProficiencies = proficiencies.map(proficiency => filterProps(proficiency.dataValues, ['id', 'level', 'name']));
  res.set('Content-Type', 'application/json');
  res.send(filteredProficiencies);
};
