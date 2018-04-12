'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const User = app.model.define('user', {
    username: {
      type: STRING,
      primaryKey: true,
      unique: true,
      validate: {
        isLowercase: true,
        notEmpty: true,
      },
    },
    email: {
      type: STRING,
      unique: true,
      validate: {
        isEmail: true,
        isLowercase: true,
        notEmpty: true,
      },
    },
    bio: STRING,
    image: STRING,
    password: STRING,
  }, {
    timestamps: true,
  });

  User.prototype.associate = function() {
    app.model.User.hasMany(app.model.Article, { as: 'articles', foreignKey: 'user_username' });
  };

  return User;
};
