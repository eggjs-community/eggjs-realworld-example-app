'use strict';

module.exports = app => {
  const { STRING, TEXT, INTEGER, JSON, UUID, UUIDV4 } = app.Sequelize;

  const Article = app.model.define('article', {
    slug: {
      type: UUID,
      unique: true,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: STRING,
    },
    body: {
      type: TEXT,
      allowNull: false,
    },
    tagList: {
      type: JSON,
      defaultValue: [],
    },
    favoritesCount: {
      type: INTEGER,
      defaultValue: 0,
    },
    favoriteUsers: {
      type: JSON,
      defaultValue: [],
    },
    username: {
      type: STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: false,
    tableName: 'articles',
  });

  Article.associate = function() {
    app.model.Article.belongsTo(app.model.User, { as: 'author', foreignKey: 'username' });
  };

  return Article;
};
