'use strict';

module.exports = app => {
  const { STRING, UUID, UUIDV4 } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
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
  }, {
    indexes: [
      { unique: true, fields: [ 'email' ], operator: 'index_user_on_email' },
      { unique: true, fields: [ 'username' ], operator: 'index_user_on_username' },
    ],
  });

  User.prototype.associate = function() {
    // bug 关联无效
    // app.model.User.hasMany(app.model.Article, { as: 'articles', foreignKey: 'id' });

    // app.model.User.hasMany(app.model.Favorites, { as: 'favorites', foreignKey: 'id' });
    // app.model.User.hasMany(app.model.Comments, { as: 'comments', foreignKey: 'id' });
  };

  return User;
};
