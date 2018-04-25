'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { createUser, createArticle } = require('../../util');

describe('test/app/service/article.test.js', () => {
  let slug,
    user1Id,
    str1,
    name1,
    name2,
    articleService;

  before(async () => {
    articleService = app.mockContext().service.article;
    name1 = 'u1' + new Date().getTime();
    name2 = 'u2' + new Date().getTime();
    str1 = 'articleService1' + new Date().getTime();
    const str2 = 'articleService2' + new Date().getTime();
    const user1 = await createUser(name1);
    const user2 = await createUser(name2);
    user1Id = user1.id;
    app.mockContext().service.profile.follow(user1Id, name2);
    const article = await createArticle(str1, user1.id);
    await createArticle(str2, user2.id);
    slug = article.slug;
    assert(article.title === str1);
  });

  it('favorite should ok', async () => {
    const result = await articleService.favorite(user1Id, slug);
    assert(result.favorites.length >= 1);
  });

  it('get should ok', async () => {
    const article = await articleService.get(slug);
    assert(article.title === str1);
    assert(article.favorites.length >= 1);
  });

  it('update should ok', async () => {
    const article = await articleService.update(slug, { title: 'hello' }, user1Id);
    assert(article.title === 'hello');
  });

  it('getByQuery should ok', async () => {
    let article = await articleService.getByQuery({});
    assert(article.rows.length >= 2);
    article = await articleService.getByQuery({ author: name1 });
    assert(article.rows.length === 1);
    article = await articleService.getByQuery({ tag: str1 });
    assert(article.rows.length === 1);
    article = await articleService.getByQuery({ favorited: name1 });
    assert(article.rows.length === 1);
    article = await articleService.getByQuery({ followerId: user1Id }
    );
    assert(article.rows.length === 1);
  });

  it('unFavorite should ok', async () => {
    const result = await articleService.unFavorite(user1Id, slug);
    assert(result.favorites.length === 0);
  });

  it('delete should ok', async () => {
    const result = await articleService.delete(slug, user1Id);
    assert(result.slug === slug);
  });
});
