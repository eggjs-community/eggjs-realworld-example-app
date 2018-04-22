'use strict';

module.exports = app => {
  const ArticleTag = app.model.define('ArticleTag', {}, {
    timestamps: true,
    underscored: false,
    tableName: 'articleTags',
  });

  ArticleTag.associate = function() {
    app.model.ArticleTag.belongsTo(app.model.Tag);
    app.model.ArticleTag.belongsTo(app.model.Article);
  };

  return ArticleTag;
};
