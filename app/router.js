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
  router.post('/profiles/:username/follow', app.jwt, controller.profile.follow);
  router.delete('/profiles/:username/follow', app.jwt, controller.profile.unfollow);
  router.get('/profiles/:username', controller.profile.get);

  /**
   * @feature query 条件参数查询
   * @query ?tag=AngularJS, ?author=jake, ?favorited=jake, ?limit=20, ?offset=0
   */
  router.get('/articles', controller.article.getByQuery);
  router.get('/articles/feed', app.jwt, controller.article.getByFeed);
  router.get('/articles/:slug', controller.article.get);

  /**
   * @feature 关注用户动态
   * @query ?limit=20, ?offset=0
   */
  router.post('/articles', app.jwt, controller.article.create);
  router.put('/articles/:slug', app.jwt, controller.article.update);
  router.delete('/articles/:slug', app.jwt, controller.article.delete);
  router.post('/articles/:slug/favorite', app.jwt, controller.article.favorite);
  router.delete('/articles/:slug/favorite', app.jwt, controller.article.unFavorite);

  // 评论
  router.post('/articles/:slug/comments', app.jwt, controller.comment.create);
  router.get('/articles/:slug/comments', controller.comment.fetch);
  router.delete('/articles/:slug/comments/:id', app.jwt, controller.comment.delete);

  // tags
  router.get('/tags', controller.tag.list);
};
