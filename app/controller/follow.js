'use strict';

const Controller = require('egg').Controller;

class FollowController extends Controller {
  async follow() {
    const { ctx, app } = this;
    const { id: userId } = ctx.state.user;
    const followUsername = ctx.params.username;

    const user = await ctx.service.follow.follow(userId, followUsername);
    ctx.body = {
      profile: app.getProfileJson(user, true),
    };
  }

  async unfollow() {
    const { ctx, app } = this;
    const { id: userId } = ctx.state.user;
    const followUsername = ctx.params.username;
    const user = await ctx.service.follow.unfollow(userId, followUsername);
    ctx.body = {
      profile: app.getProfileJson(user, false),
    };
  }

  async get() {
    const { app, ctx } = this;
    const user = app.verifyToken(ctx);
    const profileUsername = ctx.params.username;
    const userId = user && user.id;
    const profileUser = await ctx.service.follow.get(userId, profileUsername);
    if (!profileUser) ctx.throw(404, 'user not found');
    const following = profileUser.follows.some(follow => follow.followId === userId);
    ctx.body = {
      profile: app.getProfileJson(profileUser, following),
    };
  }
}

module.exports = FollowController;
