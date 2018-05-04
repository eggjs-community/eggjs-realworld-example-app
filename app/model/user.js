'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const User = app.model.define('user', {
    username: {
      type: STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,50}$/i,
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
    underscored: false,
  });

  User.associate = function() {
    app.model.User.hasMany(app.model.Article);
    app.model.User.hasMany(app.model.Comment);
    app.model.User.hasMany(app.model.Follow, { foreignKey: 'followedId' });
  };

  return User;
};
