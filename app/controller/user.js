'use strict';

const Controller = require('egg').Controller;
const uuidv1 = require('uuid/v1');

class UserController extends Controller {
  async get() {
    const { ctx, app } = this;
    const { username } = ctx.state.user;

    const user = await this.service.user.findByUsername(username);
    ctx.body = {
      user: app.getUserJson(user),
    };
  }

  async update() {
    const { ctx, app } = this;
    const user = ctx.request.body.user;
    const { username } = ctx.state.user;

    ctx.validate({
      email: { type: 'email', required: false },
      password: { type: 'string', required: false },
      bio: { type: 'string', required: false },
      image: { type: 'string', required: false },
      username: { type: 'string', required: false },
    }, user);

    let existUser = await ctx.service.user.update(user, username);
    existUser = existUser.dataValues;
    ctx.body = {
      user: app.getUserJson(existUser),
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
      user: app.getUserJson(existUser),
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
    const id = uuidv1();
    const newUser = {
      username,
      email,
      id,
      password,
    };

    await ctx.service.user.create(newUser);
    ctx.status = 201;
    ctx.body = {
      user: {
        email,
        token: app.generateJWT(id, username),
        username,
      },
    };
  }
}

module.exports = UserController;
