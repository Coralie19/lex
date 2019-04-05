module.exports = (sequelize, DataTypes) => {
  const UserLanguage = sequelize.define('userLanguage', {
    proficiencyId: {
      type: DataTypes.INTEGER,
    },
    learning: {
      type: DataTypes.BOOLEAN,
    },
  });

  UserLanguage.associate = (models) => {
    UserLanguage.belongsTo(models.proficiency, {
      foreignKey: 'proficiencyId',
      targetKey: 'id',
    });
    UserLanguage.belongsTo(models.language, {
      foreignKey: 'languageId',
      targetKey: 'id',
    });
    UserLanguage.belongsTo(models.user, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  };

  return UserLanguage;
};
