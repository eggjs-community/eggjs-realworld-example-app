'use strict';

module.exports = app => {
  if (app.config.env === 'local') {
    app.beforeStart(async () => {
      // 自动创建对应的model
      await app.model.User.sync({ force: false });
      await app.model.Article.sync({ force: false });
      await app.model.Follow.sync({ force: false });
      await app.model.Tag.sync({ force: false });
      await app.model.Favorite.sync({ force: false });
      await app.model.ArticleTag.sync({ force: false });
      await app.model.Comment.sync({ force: false });
    });
  }
};
