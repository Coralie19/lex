module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('language', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    isoCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  Language.associate = (models) => {
    Language.belongsToMany(models.user, {
      through: models.userLanguage,
      as: 'Users',
    });
  };

  return Language;
};
