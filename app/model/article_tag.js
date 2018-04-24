'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const ArticleTag = app.model.define('articleTag', {
    name: {
      type: STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: false,
    tableName: 'articleTag',
  });

  ArticleTag.associate = function() {
  };

  return ArticleTag;
};
