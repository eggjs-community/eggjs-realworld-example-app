'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  let token;
  const password = '123456';
  const username = 'user' + new Date().getTime();
  const email = `${username}@qq.com`;
  const id = '69bc33ad-fbfb-4f55-b85a-38f162fd3836';

  const assertUser = user => {
    assert(user.token);
    assert(user.username === username);
    assert(user.email === email);
  };

  it('register should ok', async () => {
    const res = await app.httpRequest().post('/users').send({ user: { id, password, email, username } });
    token = res.body.user.token;
    assertUser(res.body.user);
  });

  it('login should ok', async () => {
    const res = await app.httpRequest().post('/users/login').send({ user: { id, email, password } });
    assert(res.body.user);
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
