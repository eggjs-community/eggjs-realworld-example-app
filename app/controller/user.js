'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async get() {
    this.ctx.body = this.ctx.state.user;
  }

  // async update() {

  // }

  // async login() {
  // }

  async register() {
    const { ctx, app } = this;
    const { user } = ctx.request.body;

    // TODO: check request body
    const email = user.email;
    const password = ctx.helper.bhash(user.password);
    const username = user.username;
    const newUser = {
      username,
      email,
      password,
    };

    await this.service.user.create(newUser);
    ctx.status = 201;
    ctx.body = {
      user: {
        email,
        token: app.generateJWT(username),
        username,
      },
    };
  }
}

module.exports = UserController;
