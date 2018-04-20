'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/follow.test.js', () => {
  const password = '123456';
  const username1 = 'user1' + new Date().getTime();
  const username2 = 'user2' + new Date().getTime();
  const email1 = `${username1}@qq.com`;
  const email2 = `${username1}@qq.com`;
  let token;

  before(async () => {
    const user1 = await app.httpRequest().post('/users').send({ user: { password, email: email1, username: username1 } });
    assert(user1);
    const user2 = await app.httpRequest().post('/users').send({ user: { password, email: email2, username: username2 } });
    assert(user2);
    token = user1.body.user.token;
    assert(token);
  });

  it('follow should ok', async () => {
    const res = await app.httpRequest()
      .post(`/profiles/${username2}/follow`)
      .set('Authorization', `Bearer ${token}`);
    assert(res.following);
    assert(res.username === username1);
  });

  it('unfollow should ok', async () => {
    const res = await app.httpRequest()
      .delete(`/profiles/${username2}/follow`)
      .set('Authorization', `Bearer ${token}`);
    assert(res.following === false);
    assert(res.username === username1);
  });
});
