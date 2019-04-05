const { language: Language } = require('../db/models');
const { filterProps } = require('../utils/index');

exports.getAll = async (req, res) => {
  const languages = await Language.findAll();
  res.set('Content-Type', 'application/json');
  const filteredLanguages = languages.map(language => filterProps(language.dataValues, ['id', 'isoCode', 'name']));
  res.send(filteredLanguages);
};
