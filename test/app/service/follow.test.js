'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/follow.test.js', () => {
  const password = '123456';
  const username1 = 'user1' + new Date().getTime();
  const username2 = 'user2' + new Date().getTime();
  const email1 = `${username1}@qq.com`;
  const email2 = `${username2}@qq.com`;
  let followService;
  let userId;

  before(async () => {
    const userService = app.mockContext().service.user;
    followService = app.mockContext().service.follow;
    const user1 = await userService.create({ username: username1, password, email: email1 });
    userId = user1.id;
    assert(user1);
    const user2 = await userService.create({ username: username2, password, email: email2 });
    assert(user2);
  });

  it('follow should ok', async () => {
    const result = await followService.follow(userId, username2);
    assert(result.username === username2);
  });

  it('is should ok', async () => {
    const result = await followService.is(userId, username2);
    assert(result);
  });

  it('unfollow should ok', async () => {
    const result = await followService.unfollow(userId, username2);
    assert(result.username === username2);
  });
});
