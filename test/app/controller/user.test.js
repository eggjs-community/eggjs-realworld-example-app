'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  let token;
  const password = '123456';
  const username = 'user' + new Date().getTime();
  const email = `${username}@qq.com`;

  const assertUser = user => {
    assert(user.token);
    assert(user.username === username);
    assert(user.email === email);
  };

  it('register should ok', async () => {
    const res = await app.httpRequest().post('/users').send({ user: { password, email, username } });
    token = res.body.user.token;
    assertUser(res.body.user);
  });

  it('login should ok', async () => {
    let res = await app.httpRequest().post('/users/login').send({ user: { email, password } });
    assert(res.body.user);
    res = await app.httpRequest().post('/users/login').send({ user: { email, password: '1234567' } });
    assert(res.status === 400);
    res = await app.httpRequest().post('/users/login').send({ user: { email: 'sinchang@qq.com', password } });
    assert(res.status === 404);
  });

  it('get should ok', async () => {
    const res = await app.httpRequest()
      .get('/user')
      .set('Authorization', `Bearer ${token}`);
    assert(res.body.user);
  });

  it('update should ok', async () => {
    const res = await app.httpRequest()
      .put('/user')
      .set('Authorization', `Bearer ${token}`)
      .send({ user: { bio: 'hello' } });
    assert(res.body.user);
    assert(res.body.user.bio === 'hello');
  });
});
