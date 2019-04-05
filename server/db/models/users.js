const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aboutMe: {
      type: DataTypes.TEXT,
    },
    photoUrl: {
      type: DataTypes.STRING,
    },
    facebookId: {
      type: DataTypes.INTEGER,
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
  });
  User.prototype.validPassword = password => bcrypt.compareSync(password, this.password);

  User.associate = (models) => {
    User.belongsToMany(models.language, {
      through: models.userLanguage,
      as: 'languages',
    });
    User.hasMany(models.message, {
      foreignKey: 'authorId',
      sourceKey: 'id',
    });
  };

  return User;
};
