'use strict';

const Service = require('egg').Service;
const UUID = require('uuid/v1');
const R = require('ramda');

const articlePick = [ 'slug', 'title', 'description', 'body', 'updatedAt', 'createdAt' ];

class ArticleService extends Service {
  mergeArticleForFavorite(username, article) {
    const favorited = !!article.favoriteUsers.find(name => name === username);
    return R.compose(
      R.omit([ 'favoriteUsers' ]),
      R.merge({ favorited })
    )(article);
  }

  async favoriteArticle({ username }, slug) {
    const { ctx } = this;

    const articleRow = await ctx.model.Article.findOne({
      where: { slug },
    });

    const updatedData = await R.compose(
      list => articleRow.update({ favoriteUsers: list }),
      R.append(username),
      row => row.get('favoriteUsers')
    )(articleRow)
      .then(row => row && row.toJSON());

    return this.mergeArticleForFavorite(username, updatedData);
  }

  async unFavoriteArticle({ username }, slug) {
    const { ctx } = this;

    const articleRow = await ctx.model.Article.findOne({
      where: { slug },
    });

    const updatedData = await R.compose(
      list => articleRow.update({ favoriteUsers: list }),
      R.filter(name => name !== username),
      row => row.get('favoriteUsers')
    )(articleRow)
      .then(row => row && row.toJSON());

    return this.mergeArticleForFavorite(username, updatedData);
  }

  async getByQuery({ offset = 0, limit = 10, order_by = 'createdAt', order = 'ASC', author = '' }) {
    const { ctx } = this;
    return ctx.model.Article.findAndCountAll({
      offset,
      limit,
      order: [[ order_by, order.toUpperCase() ]],
      attributes: [ ...articlePick ],
      include: [
        {
          model: ctx.model.User,
          as: 'author',
          attributes: [ 'username', 'bio', 'image' ],
          where: author ? { username: author } : {},
          include: [{
            model: ctx.model.Follow,
          }],
        },
        {
          model: ctx.model.ArticleTag,
          as: 'tagList',
          include: [
            {
              model: ctx.model.Tag,
            },
          ],
        },
      ],
    });
  }

  async get(slug) {
    const { ctx } = this;
    const result = await ctx.model.Article.find({ where: { slug },
      attributes: [ ...articlePick ],
      include: [
        {
          model: ctx.model.User,
          as: 'author',
          attributes: [ 'username', 'bio', 'image' ],
          include: [
            {
              model: ctx.model.Follow,
            },
          ],
        },
        {
          model: ctx.model.ArticleTag,
          as: 'tagList',
          include: [
            {
              model: ctx.model.Tag,
            },
          ],
        },
      ],
    });

    return result;
  }

  async getArticlesByFeed() {
    // todo
  }

  async create(data, userId) {
    const { ctx } = this;
    data.slug = UUID(data.title);
    const { title, description, body } = data;
    const article = await ctx.model.Article.create({ title, description, body, userId });
    const tags = await Promise.all(
      data.tagList.map(tag => {
        return ctx.model.Tag.findOrCreate({ where: { name: tag } });
      })
    );

    await Promise.all(
      tags.map(tag => {
        return ctx.model.ArticleTag.create({
          articleId: article.id,
          tagId: tag[0].id,
        });
      })
    );

    return this.get(article.slug);
  }

  async update(slug, data) {
    const { ctx } = this;
    await ctx.model.Article.update(data, { where: { slug }, individualHooks: true });
    return this.get(slug);
  }

  async delete(slug) {
    const { ctx } = this;
    return await ctx.model.Article.destroy({ where: { slug } });
  }
}

module.exports = ArticleService;
