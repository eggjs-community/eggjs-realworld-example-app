'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/user.test.js', () => {
  let user,
    userService;
  const password = '123456';
  const username = new Date().getTime() + 'user';
  const email = `${username}@qq.com`;

  before(async () => {
    userService = app.mockContext().service.user;
  });

  const assertUser = user => {
    assert(user.username === username);
    assert(user.email === email);
  };

  it('create should ok', async () => {
    user = await userService.create({ email, password, username });
    assertUser(user);
  });

  it('findByEmail should ok', async () => {
    const existUser = await userService.findByEmail(email);
    assertUser(existUser);
  });

  it('findByUsername should ok', async () => {
    const existUser = await userService.findByUsername(username);
    assertUser(existUser);
  });

  it('update should ok', async () => {
    const existUser = await userService.update({ bio: 'hello' }, username);
    assertUser(existUser);
    assert(existUser.bio === 'hello');
  });
});
