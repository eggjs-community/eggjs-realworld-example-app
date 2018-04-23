'use strict';

module.exports = app => {
  const Favorite = app.model.define('favorite', {}, {
    timestamps: true,
    underscored: false,
    tableName: 'favorites',
  });

  Favorite.associate = function() {
    app.model.Favorite.belongsTo(app.model.User);
    app.model.Favorite.belongsTo(app.model.Article);
  };

  return Favorite;
};
