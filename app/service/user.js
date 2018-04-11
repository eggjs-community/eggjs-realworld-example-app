'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async createToken(username) {
    const { config, app } = this;
    const token = app.jwt.sign({ username }, config.jwt.secret);
    return token;
  }
}

module.exports = UserService;
