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
};
