'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const User = app.model.define('user', {
    username: {
      type: STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,19}$/i,
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
    app.model.User.hasMany(app.model.Article, { as: 'articles', foreignKey: 'userId' });
    app.model.User.hasMany(app.model.Follow, { foreignKey: 'userId' });
    // app.model.User.hasMany(app.model.Favorites, { as: 'favorites', foreignKey: 'id' });
    // app.model.User.hasMany(app.model.Comments, { as: 'comments', foreignKey: 'id' });
  };

  return User;
};
