'use strict';

const Service = require('egg').Service;

class FollowService extends Service {
  async follow(userId, followUsername) {
    const follows = await this.ctx.service.user.findByUsername(followUsername);
    if (!follows) {
      this.ctx.throw(404, 'followUser not found');
    }
    await this.ctx.model.Follow.create({ userId, followId: follows.id });
    return follows;
  }

  async unfollow(userId, followUsername) {
    const follows = await this.ctx.service.user.findByUsername(followUsername);
    if (!follows) {
      this.ctx.throw(404, 'followUser not found');
    }
    await this.ctx.model.Follow.destroy({
      where: {
        userId,
        followId: follows.id,
      },
    });

    return follows;
  }

  async is(userId, profileUsername) {
    const { ctx } = this;
    if (!userId) {
      return false;
    }
    const profile = await ctx.service.user.findByUsername(profileUsername);
    const result = await ctx.model.Follow.findById(userId);
    return profile.id === result.followId;
  }
}

module.exports = FollowService;
