'use strict';

const Controller = require('egg').Controller;

class FollowController extends Controller {
  async follow() {
    const { ctx, app } = this;
    const { id: userId } = ctx.state.user;
    const followUsername = ctx.params.username;

    const user = await ctx.service.follow.follow(userId, followUsername);
    // const user = await ctx.service.user.findById(userId);
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
    const following = await ctx.service.follow.is(userId, profileUsername);
    const profileUser = await ctx.service.user.findByUsername(profileUsername);
    ctx.body = {
      profile: app.getProfileJson(profileUser, following),
    };
  }
}

module.exports = FollowController;
