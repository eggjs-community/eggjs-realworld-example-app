'use strict';

const Service = require('egg').Service;
const UUID = require('uuid/v1');
const R = require('ramda');

const articlePick = [ 'slug', 'title', 'description', 'body', 'tagList', 'updatedAt', 'createdAt', 'favoritesCount' ];

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

  async getArticlesByQuery(query) {
    console.log(query);
  }

  async get(slug) {
    const { ctx } = this;
    const article = await ctx.model.Article.findById(slug, {
      attributes: [ ...articlePick ],
      include: [
        { model: ctx.model.User, as: 'author', attributes: [ 'username', 'bio', 'image' ] },
      ],
    });
    return article;
  }

  async getArticlesByFeed(follows) {
    console.log(follows);
  }

  async create(data, userId) {
    const { ctx } = this;
    data.slug = UUID(data.title);
    const article = await ctx.model.Article.create({ ...data, userId });
    return ctx.model.Article.findById(article.slug, {
      attributes: [ ...articlePick ],
      include: [
        { model: ctx.model.User, as: 'author', attributes: [ 'username', 'bio', 'image' ] },
      ],
    });
  }

  async updateArticleBySlug(slug, data) {
    const { ctx } = this;

    const pick = R.pick(articlePick);

    const [ updateCount, [ updateRow ]] = await ctx.model.Article.update(data, { where: { slug }, individualHooks: true });
    if (updateCount < 1) ctx.throw(444, 'updateArticleBySlug fail');

    return R.compose(pick, row => row && row.toJSON())(updateRow);
  }

  async deleteArticleBySlug(slug) {
    const { ctx } = this;

    const deleteCount = await ctx.model.Article.destroy({ where: { slug } });
    if (deleteCount < 1) throw new Error('deleteArticleBySlug fail');

    return 'delete success';
  }
}

module.exports = ArticleService;
