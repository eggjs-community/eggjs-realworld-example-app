'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/follow.test.js', () => {
  const password = '123456';
  const username1 = 'user1' + new Date().getTime();
  const username2 = 'user2' + new Date().getTime();
  const email1 = `${username1}@qq.com`;
  const email2 = `${username2}@qq.com`;
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
    assert(res.body.profile.following === true);
    assert(res.body.profile.username === username2);
  });

  it('is should ok', async () => {
    let res = await app.httpRequest()
      .get(`/profiles/${username2}`)
      .set('Authorization', `Bearer ${token}`);
    console.log(res.body.profile);
    assert(res.body.profile.following === true);
    assert(res.body.profile.username === username2);
    res = await app.httpRequest()
      .get(`/profiles/${username2}`);
    assert(res.body.profile.following === false);
    assert(res.body.profile.username === username2);
  });

  it('unfollow should ok', async () => {
    const res = await app.httpRequest()
      .delete(`/profiles/${username2}/follow`)
      .set('Authorization', `Bearer ${token}`);
    assert(res.body.profile.following === false);
    assert(res.body.profile.username === username2);
  });
});
