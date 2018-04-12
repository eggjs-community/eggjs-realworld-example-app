'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const User = app.model.define('user', {
    username: {
      type: STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
      validate: {
        isLowercase: true,
      },
    },
    email: {
      type: STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        isLowercase: true,
      },
    },
    bio: STRING,
    image: STRING,
    password: {
      type: STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'users',
  });

  User.prototype.associate = function() {
    app.model.User.hasMany(app.model.Article, { as: 'articles', foreignKey: 'user_username' });
  };

  return User;
};
