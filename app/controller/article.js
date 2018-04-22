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

  async getArticlesByQuery() {
    // todo
  }

  async get(slug) {
    const { ctx, service, app } = this;
    slug = ctx.params || slug;
    let article = await service.article.get(slug);
    article = article.get();
    const tokenUser = app.verifyToken(ctx);
    let following = false;
    if (tokenUser) {
      following = await ctx.service.follow.is(tokenUser.userId, article.author.username);
    }
    article.author.dataValues.following = !!following;
    article.tagList = article.tagList.map(tag => tag.tag.name);
    ctx.body = { article };
  }


  async getArticlesByFeed() {
    // todo
  }

  async create() {
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

    let article = await service.article.create(data, userId);
    article = article.get();
    article.author.dataValues.following = false;
    article.tagList = article.tagList.map(tag => tag.tag.name);
    ctx.body = { article };
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
