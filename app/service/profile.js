'use strict';

const Service = require('egg').Service;

class ProfileService extends Service {
  async follow(userId, followedUsername) {
    let followedUser = await this.ctx.service.user.findByUsername(followedUsername);

    await this.ctx.model.Follow.findOrCreate({ where: { followedId: followedUser.id, followerId: userId } });

    followedUser = followedUser.get();
    followedUser.following = true;

    return followedUser;
  }

  async unfollow(userId, followedUsername) {
    let followedUser = await this.ctx.service.user.findByUsername(followedUsername);

    await this.ctx.model.Follow.destroy({
      where: {
        followedId: followedUser.id,
        followerId: userId,
      },
    });

    followedUser = followedUser.get();
    followedUser.following = false;

    return followedUser;
  }

  async get(userId, followedUsername) {
    const { ctx } = this;
    let followedUser = await this.ctx.service.user.findByUsername(followedUsername);

    followedUser = followedUser.get();

    if (userId) {
      followedUser.following = !!await ctx.model.Follow.count({
        where: {
          followedId: followedUser.id,
          followerId: userId,
        },
      });
    } else {
      followedUser.following = false;
    }

    return followedUser;
  }
}

module.exports = ProfileService;
