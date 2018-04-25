'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { createUser } = require('../../util');

describe('test/app/service/profile.test.js', () => {
  let username;
  let profileService;
  let userId;

  before(async () => {
    profileService = app.mockContext().service.profile;
    const name1 = 'u1' + new Date().getTime();
    const name2 = 'u2' + new Date().getTime();
    const user1 = await createUser(name1);
    userId = user1.id;
    assert(user1.username === name1);
    const user2 = await createUser(name2);
    assert(user2.username === name2);
    username = user2.username;
  });

  it('follow should ok', async () => {
    const result = await profileService.follow(userId, username);
    assert(result.username === username);
    assert(result.following === true);
  });

  it('get should ok', async () => {
    let result = await profileService.get(userId, username);
    assert(result.username === username);
    assert(result.following === true);
    result = await profileService.get('', username);
    assert(result.following === false);
  });

  it('unfollow should ok', async () => {
    const result = await profileService.unfollow(userId, username);
    assert(result.username === username);
    assert(result.following === false);
  });
});
