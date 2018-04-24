'use strict';

const Controller = require('egg').Controller;

class ProfileController extends Controller {
  async follow() {
    const { ctx, app } = this;
    const { id: userId } = ctx.state.user;
    const followedUsername = ctx.params.username;

    const user = await ctx.service.profile.follow(userId, followedUsername);
    ctx.body = {
      profile: app.getProfileJson(user),
    };
  }

  async unfollow() {
    const { ctx, app } = this;
    const { id: userId } = ctx.state.user;
    const followedUsername = ctx.params.username;
    const user = await ctx.service.profile.unfollow(userId, followedUsername);
    ctx.body = {
      profile: app.getProfileJson(user),
    };
  }

  async get() {
    const { app, ctx } = this;
    const user = app.verifyToken(ctx);
    const followedUsername = ctx.params.username;
    const userId = user && user.id;
    const followedUser = await ctx.service.profile.get(userId, followedUsername);
    ctx.body = {
      profile: app.getProfileJson(followedUser),
    };
  }
}

module.exports = ProfileController;
