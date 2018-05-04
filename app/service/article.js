'use strict';

const Service = require('egg').Service;
const articlePick = [ 'slug', 'title', 'description', 'body', 'updatedAt', 'createdAt' ];

class ArticleService extends Service {
  async favorite(userId, slug) {
    const { ctx } = this;

    const article = await this.check(slug, userId, false);

    await ctx.model.Favorite.findOrCreate({
      where: {
        articleId: article.id,
        userId,
      } });

    return this.get(slug);
  }

  async unFavorite(userId, slug) {
    const { ctx } = this;

    const article = await this.check(slug, userId, false);

    await ctx.model.Favorite.destroy({
      where: {
        articleId: article.id,
        userId,
      },
    });

    return this.get(slug);
  }

  async getByQuery({
    offset = 0,
    limit = 10,
    order_by = 'createdAt',
    order = 'DESC',
    author = '',
    tag = '',
    followerId = '',
    favorited = '' }) {
    const { ctx } = this;
    let articleId = null;
    let favoritedUser;

    if (tag) {
      const result = await ctx.model.Tag.findOne({
        where: { name: tag },
        include: [
          {
            model: ctx.model.ArticleTag,
          },
        ],
      });

      if (!result) return ctx.throw(404, 'tag not found');

      articleId = result.articleTags.map(item => item.articleId);
    }

    if (favorited) {
      favoritedUser = await ctx.service.user.findByUsername(favorited);
    }

    return ctx.model.Article.findAndCountAll({
      offset: Number(offset),
      limit: Number(limit),
      order: [[ order_by, order.toUpperCase() ]],
      attributes: [ ...articlePick ],
      where: tag ? { id: { $in: articleId } } : null,
      distinct: true, // Ref: http://t.cn/RuLhRvW
      include: [
        {
          model: ctx.model.User,
          as: 'author',
          attributes: [ 'username', 'bio', 'image' ],
          where: author ? { username: author } : {},
          include: [{
            model: ctx.model.Follow,
            where: followerId ? { followerId } : null,
          }],
        },
        {
          model: ctx.model.Favorite,
          where: favorited ? { userId: favoritedUser.id } : null,
        },
        {
          model: ctx.model.ArticleTag,
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
    const article = await ctx.model.Article.findOne({
      where: { slug },
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
          model: ctx.model.Favorite,
        },
        {
          model: ctx.model.ArticleTag,
          include: [
            {
              model: ctx.model.Tag,
            },
          ],
        },
      ],
    });

    if (!article) ctx.throw(404, 'article not found');
    return article;
  }

  async create(data, userId) {
    const { ctx } = this;
    const { title, description, body, tagList = [] } = data;
    const article = await ctx.model.Article.create({ title, description, body, userId });

    const tags = await Promise.all(
      tagList.map(tag => {
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

  async update(slug, data, userId) {
    const article = await this.check(slug, userId, true);

    await article.update(data);

    return this.get(slug);
  }

  async delete(slug, userId) {
    const article = await this.check(slug, userId, true);

    return article.destroy();
  }

  // admin = true ->  不允许非文章作者进行操作
  async check(slug, userId, admin) {
    const { ctx } = this;
    const article = await ctx.model.Article.findOne({ where: { slug } });

    if (!article) return ctx.throw(404, 'article not found');

    if (article.userId !== userId && admin) return ctx.throw(403);

    return article;
  }
}

module.exports = ArticleService;
