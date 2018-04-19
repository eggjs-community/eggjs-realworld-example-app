'use strict';

module.exports = app => {
  const { STRING, TEXT, INTEGER, JSON, UUID, UUIDV4 } = app.Sequelize;

  const Article = app.model.define('article', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    slug: {
      type: UUID,
      unique: true,
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
    userId: {
      type: UUID,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'article',
  }, {
    indexes: [
      { unique: true, fields: [ 'slug' ], operator: 'index_articles_on_slug' },
      { unique: true, fields: [ 'userId' ], operator: 'index_articles_on_user_id' },
    ],
  });

  Article.prototype.associate = function() {
    app.model.Article.belongsTo(app.model.User, { as: 'author', foreignKey: 'userId' });
  };

  return Article;
};
