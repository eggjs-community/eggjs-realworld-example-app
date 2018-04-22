'use strict';

const Service = require('egg').Service;

class FollowService extends Service {
  async follow(userId, followUsername) {
    const follows = await this.ctx.service.user.findByUsername(followUsername);
    if (!follows) {
      this.ctx.throw(404, 'followUser not found');
    }
    await this.ctx.model.Follow.findOrCreate({ where: { userId: follows.id, followId: userId } });
    return follows;
  }

  async unfollow(userId, followUsername) {
    const follows = await this.ctx.service.user.findByUsername(followUsername);
    if (!follows) {
      this.ctx.throw(404, 'followUser not found');
    }
    await this.ctx.model.Follow.destroy({
      where: {
        userId: follows.id,
        followId: userId,
      },
    });

    return follows;
  }

  async get(userId, profileUsername) {
    const { ctx } = this;
    const profile = await ctx.model.User.find({
      where: { username: profileUsername },
      include: [
        {
          model: ctx.model.Follow,
        },
      ],
    });
    return profile;
  }
}

module.exports = FollowService;
