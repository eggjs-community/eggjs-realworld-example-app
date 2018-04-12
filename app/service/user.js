'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async create(user) {
    return this.ctx.model.User.create(user);
  }
}

module.exports = UserService;
