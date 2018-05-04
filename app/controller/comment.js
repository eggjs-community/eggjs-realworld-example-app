'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  async addCommentsToArticle() {
    const { ctx } = this;
    const { id: userId } = ctx.state.user;
    const { slug } = ctx.params;

    ctx.validate({ comment: { type: 'object', required: true } }, ctx.request.body);
    ctx.validate({ body: { type: 'string', required: true } }, ctx.request.body.comment);

    const { comment } = ctx.request.body;

    const respComment = await ctx.service.comment.addCommentsToArticle({ userId, slug, body: comment.body });
    ctx.body = { comment: respComment };
  }

  async getCommentsFromArticleSlug() {
    const { ctx, app } = this;
    const { slug } = ctx.params;
    const user = app.verifyToken(ctx);
    const userId = user && user.id;

    ctx.validate({ slug: { type: 'string', required: true } }, ctx.params);

    const comments = await ctx.service.comment.getCommentsFromArticleSlug(slug, userId);
    ctx.body = comments;
  }

  async deleteCommentBySlugAndId() {
    const { ctx } = this;
    const { slug, id } = ctx.params;
    const { id: userId } = ctx.state.user;

    ctx.validate({
      id: { type: 'string', required: true },
      slug: { type: 'string', required: true },
    }, ctx.params);

    const message = await ctx.service.comment.deleteCommentBySlugAndId({ slug, id, userId });
    ctx.body = { message };
  }
}

module.exports = CommentController;
