'use strict';

const { app } = require('egg-mock/bootstrap');

exports.createUser = name => {
  const data = {
    username: name,
    email: name + '@qq.com',
    password: name,
  };

  return app.mockContext().service.user.create(data);
};

exports.createArticle = (str, userId) => {
  const data = {
    title: str,
    body: str,
    description: str,
    tagList: [ str ],
  };

  return app.mockContext().service.article.create(data, userId);
};
