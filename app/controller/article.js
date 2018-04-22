'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async favoriteArticle() {
    const { ctx, app, service } = this;
    const { slug } = ctx.params;

    const user = app.verifyToken(ctx);

    const article = await service.article.favoriteArticle(user, slug);

    ctx.body = article;
  }

  async unFavoriteArticle() {
    const { ctx, app, service } = this;
    const { slug } = ctx.params;

    const user = app.verifyToken(ctx);

    const article = await service.article.unFavoriteArticle(user, slug);

    ctx.body = article;
  }

  async getByQuery() {
    const { ctx, app } = this;
    const user = app.verifyToken(ctx);
    const userId = user && user.id;
    let articles = await ctx.service.article.getByQuery({ ...ctx.request.query, userId });
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
    if (!article) ctx.throw(404, 'article not found');
    ctx.body = { article: app.getArticleJson(article, userId) };
  }


  async getArticlesByFeed() {
    // todo
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
      },
    };
    ctx.validate(RULE_CREATE, data);

    const article = await service.article.create(data, userId);
    ctx.body = { article: app.getArticleJson(article, userId) };
  }

  async update() {
    const { ctx, service } = this;
    const { slug } = ctx.params;
    const { article: data } = ctx.request.body;

    ctx.validate({ slug: { type: 'string', required: true } }, ctx.params);

    let article = await service.article.update(slug, data);
    article = article.get();
    article.author.dataValues.following = false;
    article.tagList = article.tagList.map(tag => tag.tag.name);
    ctx.body = { article };
  }

  async delete() {
    const { ctx, service } = this;
    const { slug } = ctx.params;

    ctx.validate({ slug: { type: 'string', required: true } }, ctx.params);

    const result = await service.article.delete(slug);
    const message = result ? 'succeed' : 'failed';
    ctx.body = { message };
  }
}

module.exports = ArticleController;
