'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/profile.test.js', () => {
  const password = '123456';
  const username1 = 'user1' + new Date().getTime();
  const username2 = 'user2' + new Date().getTime();
  const email1 = `${username1}@qq.com`;
  const email2 = `${username2}@qq.com`;
  let profileService;
  let userId;

  before(async () => {
    const userService = app.mockContext().service.user;
    profileService = app.mockContext().service.profile;
    const user1 = await userService.create({ username: username1, password, email: email1 });
    userId = user1.id;
    assert(user1);
    const user2 = await userService.create({ username: username2, password, email: email2 });
    assert(user2);
  });

  it('follow should ok', async () => {
    const result = await profileService.follow(userId, username2);
    assert(result.username === username2);
  });

  it('get should ok', async () => {
    const result = await profileService.get(userId, username2);
    assert(result.username === username2);
  });

  it('unfollow should ok', async () => {
    const result = await profileService.unfollow(userId, username2);
    assert(result.username === username2);
  });
});
