'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { createUser, createArticle } = require('../../util');

describe('test/app/service/tag.test.js', () => {
  let str;
  before(async () => {
    const name = 'u' + new Date().getTime();
    str = 'tagService' + new Date().getTime();
    const user = await createUser(name);
    assert(user.username === name);

    const article = await createArticle(str, user.id);
    assert(article.title === str);
  });

  it('get should ok', async () => {
    const res = await app.httpRequest()
      .get('/tags');
    assert(res.body.tags.length >= 1);
  });
});
