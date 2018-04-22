'use strict';

const Service = require('egg').Service;
const attributes = [ 'username', 'bio', 'image', 'email' ];

class UserService extends Service {
  async create(user) {
    return await this.ctx.model.User.create(user);
  }

  async findByEmail(email) {
    const user = await this.ctx.model.User.findOne({ where: { email } });
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async findByUsername(username) {
    const user = await this.ctx.model.User.findOne({ where: { username } });
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async findById(id) {
    const user = await this.ctx.model.User.findById(id, {
      attributes,
    });
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async update(values, id) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(values);
  }
}

module.exports = UserService;
