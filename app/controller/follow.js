'use strict';

const Controller = require('egg').Controller;

class FollowController extends Controller {
  async create() {
    const { ctx, app } = this;
    const followerUsername = ctx.state.user.username;
    const followedUsername = ctx.params.username;
    await ctx.service.user.findByUsername(followedUsername);

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

  async get() {
    const { app, ctx } = this;
    const tokenUser = app.verifyToken(ctx);
    const profileUsername = ctx.params.username;
    let following;
    if (tokenUser) {
      following = await ctx.service.follow.is({
        followedUsername: profileUsername,
        followerUsername: tokenUser.username,
      });
    }

    const profileUser = await ctx.service.user.findByUsername(profileUsername);
    delete profileUser.password;
    profileUser.following = Boolean(following);
    ctx.body = {
      profile: profileUser,
    };
  }
}

module.exports = FollowController;
