'use strict';

const Service = require('egg').Service;

class FollowService extends Service {
  async follow(userId, followedUsername) {
    const follows = await this.ctx.service.user.findByUsername(followedUsername);
    if (!follows) {
      this.ctx.throw(404, 'followUser not found');
    }
    await this.ctx.model.Follow.findOrCreate({ where: { followedId: follows.id, followerId: userId } });

    return follows;
  }

  async unfollow(userId, followedUsername) {
    const follows = await this.ctx.service.user.findByUsername(followedUsername);
    if (!follows) {
      this.ctx.throw(404, 'followUser not found');
    }
    await this.ctx.model.Follow.destroy({
      where: {
        followedId: follows.id,
        followerId: userId,
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

    if (!profile) ctx.throw(404, 'user not found');

    return profile;
  }
}

module.exports = FollowService;
