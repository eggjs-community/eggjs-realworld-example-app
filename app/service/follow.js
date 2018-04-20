'use strict';

const Service = require('egg').Service;

class FollowService extends Service {
  async create(follow) {
    return this.ctx.model.Follow.create(follow);
  }

  async delete(follow) {
    const follows = await this.ctx.model.Follow.findOne({ where: follow });
    if (!follows) {
      this.ctx.throw(404, 'follow releation not found');
    }
    return follows.destroy();
  }
}

module.exports = FollowService;
