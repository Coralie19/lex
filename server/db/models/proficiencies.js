module.exports = (sequelize, DataTypes) => {
  const Proficiency = sequelize.define('proficiency', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Proficiency.associate = (models) => {
    Proficiency.hasMany(models.userLanguage, {
      foreignKey: 'proficiencyId',
      targetKey: 'id',
    });
  };

  return Proficiency;
};
