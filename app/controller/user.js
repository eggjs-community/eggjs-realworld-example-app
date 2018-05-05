'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async get() {
    const { ctx, app } = this;
    const { id } = ctx.state.user;

    const user = await this.service.user.findById(id);
    ctx.body = {
      user: app.getUserJson(user, ctx),
    };
  }

  async update() {
    const { ctx, app } = this;
    const user = ctx.request.body.user;
    const { id } = ctx.state.user;

    ctx.validate({
      email: { type: 'email', required: false },
      password: { type: 'string', required: false },
      bio: { type: 'string', required: false, allowEmpty: true },
      image: { type: 'string', required: false, allowEmpty: true },
      username: { type: 'string', required: false },
    }, user);
    const existUser = await ctx.service.user.update(user, id);
    ctx.body = {
      user: app.getUserJson(existUser, ctx),
    };
  }

  async login() {
    const { ctx, app } = this;
    const user = ctx.request.body.user;
    const { email, password } = user;

    ctx.validate({
      email: { type: 'email', required: true },
      password: { type: 'string', required: true },
    }, user);

    const existUser = await ctx.service.user.findByEmail(email);
    if (!ctx.helper.bcompare(password, existUser.password)) {
      ctx.status = 400;
      ctx.body = { error: 'password is invalid' };
      return;
    }

    ctx.body = {
      user: app.getUserJson(existUser, ctx),
    };
  }

  async register() {
    const { ctx, app } = this;
    const { user } = ctx.request.body;

    ctx.validate({
      email: { type: 'email', required: true },
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    }, user);

    const email = user.email;
    const password = ctx.helper.bhash(user.password);
    const { username } = user;
    const newUser = {
      username,
      email,
      password,
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    };

    const result = await ctx.service.user.create(newUser);
    ctx.status = 201;
    ctx.body = {
      user: app.getUserJson(result, ctx),
    };
  }
}

module.exports = UserController;
