'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async getArticlesByQuery() {
    // todo
  }

  async getArticlesBySlug() {
    const { ctx, service } = this;
    const { slug } = ctx.params;

    const article = await service.article.getArticlesBySlug(slug);

    ctx.body = article
  }


  async getArticlesByFeed() {
    // todo
  }

  async createAnArticle() {
    const { ctx, service } = this;
    const { article: data } = ctx.request.body;
    const { id: userId } = ctx.state.user;

    const RULE_CREATE = {
      title: {
        type: 'string',
        required: true,
      },
      description: {
        type: 'string',
      },
      body: {
        type: 'string',
        required: true,
      },
      tagList: {
        type: 'array',
      },
    }
    ctx.validate(RULE_CREATE, data);

    const article = await service.article.createAnArticle({ userId, ...data });
    ctx.body = article;
  }

  async updateArticleBySlug() {
    const { ctx, service } = this;
    const { slug } = ctx.params;
    const { article: data } = ctx.request.body;

    ctx.validate({ slug: { type: 'string', required: true }}, ctx.params);

    const article = await service.article.updateArticleBySlug(slug, data);
    ctx.body = article;
  }

  async deleteArticleBySlug() {
    const { ctx, service } = this;
    const { slug } = ctx.params;

    ctx.validate({ slug: { type: 'string', required: true }}, ctx.params);

    const message = await service.article.deleteArticleBySlug(slug);
    ctx.body = message;
  }
}

module.exports = ArticleController;
