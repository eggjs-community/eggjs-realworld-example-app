'use strict';

module.exports = app => {
  const ArticleTag = app.model.define('articleTag', {}, {
    timestamps: true,
    underscored: false,
    tableName: 'articleTag',
  });

  ArticleTag.associate = function() {
    app.model.ArticleTag.belongsTo(app.model.Tag);
  };

  return ArticleTag;
};
