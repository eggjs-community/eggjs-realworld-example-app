'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async create(user) {
    return this.ctx.model.User.create(user);
  }

  async findByEmail(email) {
    const user = await this.ctx.model.User.findOne({ where: { email }, raw: true });
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async findByUsername(username) {
    const user = await this.ctx.model.User.findOne({ where: { username }, raw: true });
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async update(values, username) {
    const user = await this.ctx.model.User.findOne({ where: { username } });
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(values);
  }
}

module.exports = UserService;
