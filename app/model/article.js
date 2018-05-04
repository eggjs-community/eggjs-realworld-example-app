'use strict';

module.exports = app => {
  const { INTEGER, STRING, TEXT, UUID, UUIDV4 } = app.Sequelize;

  const Article = app.model.define('article', {
    slug: {
      type: UUID,
      unique: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: STRING,
      allowNull: false,
    },
    body: {
      type: TEXT,
      allowNull: false,
    },
    userId: {
      type: INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: false,
    tableName: 'articles',
  });

  Article.associate = function() {
    app.model.Article.belongsTo(app.model.User, { as: 'author', foreignKey: 'userId' });
    app.model.Article.hasMany(app.model.ArticleTag);
    app.model.Article.hasMany(app.model.Favorite);
    app.model.Article.hasMany(app.model.Comment);
  };

  return Article;
};
