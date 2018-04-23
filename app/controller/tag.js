'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  async list() {
    const { ctx } = this;
    let tags = await ctx.service.tag.list();
    tags = tags.map(tag => tag.name);
    ctx.body = { tags };
  }
}

module.exports = TagController;
