'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  async create() {
    const { ctx } = this;
    const { id: userId } = ctx.state.user;
    const { slug } = ctx.params;

    ctx.validate({ comment: { type: 'object', required: true } }, ctx.request.body);
    ctx.validate({ body: { type: 'string', required: true } }, ctx.request.body.comment);

    const { comment } = ctx.request.body;

    const respComment = await ctx.service.comment.create({ userId, slug, body: comment.body });
    ctx.body = { comment: respComment };
  }

  async fetch() {
    const { ctx, app } = this;
    const { slug } = ctx.params;
    const user = app.verifyToken(ctx);
    const userId = user && user.id;

    ctx.validate({ slug: { type: 'string', required: true } }, ctx.params);

    const comments = await ctx.service.comment.fetch(slug, userId);
    ctx.body = { comments };
  }

  async delete() {
    const { ctx } = this;
    const { slug, id } = ctx.params;
    const { id: userId } = ctx.state.user;

    ctx.validate({
      id: { type: 'string', required: true },
      slug: { type: 'string', required: true },
    }, ctx.params);

    const count = await ctx.service.comment.delete({ slug, id, userId });
    const message = count > 0 ? 'succeed' : 'failed';
    ctx.body = { message };
  }
}

module.exports = CommentController;
