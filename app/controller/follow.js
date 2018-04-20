'use strict';

const Controller = require('egg').Controller;

class FollowController extends Controller {
  async create() {
    const { ctx, app } = this;
    const followerUsername = ctx.state.user.username;
    const followedUsername = ctx.params.username;
    const followedUser = await ctx.service.user.findByUsername(followedUsername);

    if (!followedUser) {
      ctx.throw(404, 'followedUser not found');
    }

    await ctx.service.follow.create({
      followerUsername,
      followedUsername,
    });

    let user = await ctx.service.user.findByUsername(followerUsername);
    user = app.getUserJson(user);
    user.following = true;
    ctx.body = {
      profile: user,
    };
  }

  async delete() {
    const { ctx, app } = this;
    const followerUsername = ctx.state.user.username;
    const followedUsername = ctx.params.username;
    await ctx.service.follow.delete({ followedUsername, followerUsername });

    let user = await ctx.service.user.findByUsername(followerUsername);
    user = app.getUserJson(user);
    user.following = false;
    ctx.body = {
      profile: user,
    };
  }
}

module.exports = FollowController;
