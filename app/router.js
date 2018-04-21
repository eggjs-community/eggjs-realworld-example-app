'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/users/login', controller.user.login);
  router.post('/users', controller.user.register);
  router.get('/user', app.jwt, controller.user.get);
  router.put('/user', app.jwt, controller.user.update);
  router.post('/profiles/:username/follow', app.jwt, controller.follow.create);
  router.delete('/profiles/:username/follow', app.jwt, controller.follow.delete);
  router.get('/profiles/:username', controller.follow.get);

  /**
   * @feature query 条件参数查询
   * @query ?tag=AngularJS, ?author=jake, ?favorited=jake, ?limit=20, ?offset=0
   */
  router.get('/articles', controller.article.getArticlesByQuery);
  router.get('/articles/:slug', controller.article.get);

  /**
   * @feature 关注用户动态
   * @query ?limit=20, ?offset=0
   */
  router.get('/articles/feed', app.jwt, controller.article.getArticlesByFeed);
  router.post('/articles', app.jwt, controller.article.create);
  router.put('/articles/:slug', app.jwt, controller.article.updateArticleBySlug);
  router.delete('/articles/:slug', app.jwt, controller.article.deleteArticleBySlug);
  router.post('/articles/:slug/favorite', app.jwt, controller.article.favoriteArticle);
  router.delete('/articles/:slug/favorite', app.jwt, controller.article.unFavoriteArticle);

};
