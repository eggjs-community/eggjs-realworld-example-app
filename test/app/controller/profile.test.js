'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { createUser } = require('../../util');

describe('test/app/controller/profile.test.js', () => {
  let token;
  let username;

  before(async () => {
    const name1 = 'u1' + new Date().getTime();
    const name2 = 'u2' + new Date().getTime();
    const user1 = await createUser(name1);
    username = user1.username;
    assert(user1.username === name1);
    const user2 = await app.httpRequest().post('/users').send({ user: { password: name2, email: name2 + '@qq.com', username: name2 } });
    token = user2.body.user.token;
    assert(token);
  });

  it('follow should ok', async () => {
    const res = await app.httpRequest()
      .post(`/profiles/${username}/follow`)
      .set('Authorization', `Bearer ${token}`);
    assert(res.body.profile.following === true);
    assert(res.body.profile.username === username);
  });

  it('get should ok', async () => {
    let res = await app.httpRequest()
      .get(`/profiles/${username}`)
      .set('Authorization', `Bearer ${token}`);
    assert(res.body.profile.following === true);
    assert(res.body.profile.username === username);
    res = await app.httpRequest()
      .get('/profiles/sinchang')
      .set('Authorization', `Bearer ${token}`);
    assert(res.status === 404);
  });

  it('unfollow should ok', async () => {
    const res = await app.httpRequest()
      .delete(`/profiles/${username}/follow`)
      .set('Authorization', `Bearer ${token}`);
    assert(res.body.profile.following === false);
    assert(res.body.profile.username === username);
  });
});
