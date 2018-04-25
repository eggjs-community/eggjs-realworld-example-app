'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { createArticle } = require('../../util');

describe('test/app/controller/article.test.js', () => {
  let slug1,
    slug2,
    str1,
    str2,
    name1,
    name2,
    token1,
    token2;

  before(async () => {
    name1 = 'u1' + new Date().getTime();
    name2 = 'u2' + new Date().getTime();
    str1 = 'articleService1' + new Date().getTime();
    str2 = 'articleService2' + new Date().getTime();
    const user1 = await app.httpRequest()
      .post('/users')
      .send({
        user: {
          username: name1,
          password: name1,
          email: name1 + '@qq.com',
        },
      });
    const user2 = await app.httpRequest()
      .post('/users')
      .send({
        user: {
          username: name2,
          password: name2,
          email: name2 + '@qq.com',
        },
      });
    token2 = user2.body.user.token;
    token1 = user1.body.user.token;
    const { id: user1Id } = app.jwt.verify(token1, app.config.jwt.secret);
    const { id: user2Id } = app.jwt.verify(token2, app.config.jwt.secret);
    app.mockContext().service.profile.follow(user1Id, name2);
    const article = await createArticle(str2, user2Id);
    slug2 = article.slug;
  });

  it('create should ok', async () => {
    const article = await app.httpRequest()
      .post('/articles')
      .set('Authorization', `Bearer ${token1}`)
      .send({
        article: {
          title: str1,
          body: str1,
          description: str1,
        },
      });
    slug1 = article.body.article.slug;
    assert(article.body.article.title === str1);
  });

  it('favorite should ok', async () => {
    let result = await app.httpRequest()
      .post(`/articles/${slug2}/favorite`)
      .set('Authorization', `Bearer ${token1}`);
    assert(result.body.article.favorited === true);
    result = await app.httpRequest()
      .post('/articles/sinchang/favorite')
      .set('Authorization', `Bearer ${token1}`);
    assert(result.status === 404);
  });

  it('get should ok', async () => {
    let result = await app.httpRequest()
      .get(`/articles/${slug2}`)
      .set('Authorization', `Bearer ${token1}`);
    assert(result.body.article.title === str2);
    assert(result.body.article.favorited === true);
    result = await app.httpRequest()
      .get('/articles/1222');
    assert(result.status === 404);
  });

  it('update should ok', async () => {
    let result = await app.httpRequest()
      .put(`/articles/${slug1}`)
      .set('Authorization', `Bearer ${token1}`)
      .send({
        article: {
          title: 'hello',
        },
      });
    assert(result.body.article.title === 'hello');
    result = await app.httpRequest()
      .put(`/articles/${slug1}`)
      .set('Authorization', `Bearer ${token2}`)
      .send({
        article: {
          title: 'hello',
        },
      });
    assert(result.status === 403);
  });

  it('getByQuery should ok', async () => {
    let result = await app.httpRequest()
      .get('/articles');
    assert(result.body.articles.length >= 2);
    result = await app.httpRequest()
      .get(`/articles?author=${name1}`);
    assert(result.body.articles.length === 1);
    result = await app.httpRequest()
      .get(`/articles?tag=${str2}`);
    assert(result.body.articles.length === 1);
    result = await app.httpRequest()
      .get(`/articles?favorited=${name1}`);
    assert(result.body.articles.length === 1);
    result = await app.httpRequest()
      .get('/articles?tag=sinchang');
    assert(result.status === 404);
  });

  it('unFavorite should ok', async () => {
    const result = await app.httpRequest()
      .delete(`/articles/${slug2}/favorite`)
      .set('Authorization', `Bearer ${token1}`);
    assert(result.body.article.favorited === false);
  });

  it('getByFeed should ok', async () => {
    const result = await app.httpRequest()
      .get('/articles/feed')
      .set('Authorization', `Bearer ${token1}`);
    assert(result.body.articles.length === 1);
  });

  it('delete should ok', async () => {
    let result = await app.httpRequest()
      .delete(`/articles/${slug1}`)
      .set('Authorization', `Bearer ${token2}`);
    assert(result.status === 403);
    result = await app.httpRequest()
      .delete(`/articles/${slug1}`)
      .set('Authorization', `Bearer ${token1}`);
    assert(result.body.message === 'succeed');
  });
});
