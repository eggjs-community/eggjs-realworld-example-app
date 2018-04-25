'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async favorite() {
    const { ctx, app, service } = this;
    const { slug } = ctx.params;
    const { id: userId } = ctx.state.user;
    const article = await service.article.favorite(userId, slug);

    ctx.body = { article: app.getArticleJson(article, userId) };
  }

  async unFavorite() {
    const { ctx, app, service } = this;
    const { slug } = ctx.params;
    const { id: userId } = ctx.state.user;
    const article = await service.article.unFavorite(userId, slug);

    ctx.body = { article: app.getArticleJson(article, userId) };
  }

  async getByQuery() {
    const { ctx, app } = this;
    const user = app.verifyToken(ctx);
    const userId = user && user.id;
    let articles = await ctx.service.article.getByQuery({ ...ctx.request.query });
    const articlesCount = articles.count;
    articles = articles.rows.map(article => app.getArticleJson(article, userId));
    ctx.body = { articles, articlesCount };
  }

  async get() {
    const { ctx, service, app } = this;
    const slug = ctx.params.slug;
    const user = app.verifyToken(ctx);
    const userId = user && user.id;
    const article = await service.article.get(slug);
    ctx.body = { article: app.getArticleJson(article, userId) };
  }


  async getByFeed() {
    const { ctx, app } = this;
    const { id: userId } = ctx.state.user;
    let articles = await ctx.service.article.getByQuery({ followerId: userId });
    const articlesCount = articles.count;
    articles = articles.rows.map(article => app.getArticleJson(article, userId));
    ctx.body = { articles, articlesCount };
  }

  async create() {
    const { ctx, service, app } = this;
    const { article: data } = ctx.request.body;
    const { id: userId } = ctx.state.user;

    const RULE_CREATE = {
      title: {
        type: 'string',
        required: true,
      },
      description: {
        type: 'string',
        required: true,
      },
      body: {
        type: 'string',
        required: true,
      },
      tagList: {
        type: 'array',
        required: false,
      },
    };
    ctx.validate(RULE_CREATE, data);

    const article = await service.article.create(data, userId);
    ctx.body = { article: app.getArticleJson(article, userId) };
  }

  async update() {
    const { ctx, service, app } = this;
    const { slug } = ctx.params;
    const { article: data } = ctx.request.body;
    const { id: userId } = ctx.state.user;

    ctx.validate({ slug: { type: 'string', required: true } }, ctx.params);

    const article = await service.article.update(slug, data, userId);
    ctx.body = { article: app.getArticleJson(article, userId) };
  }

  async delete() {
    const { ctx, service } = this;
    const { slug } = ctx.params;
    const { id: userId } = ctx.state.user;

    ctx.validate({ slug: { type: 'string', required: true } }, ctx.params);

    const result = await service.article.delete(slug, userId);
    const message = result ? 'succeed' : 'failed';
    ctx.body = { message };
  }
}

module.exports = ArticleController;
