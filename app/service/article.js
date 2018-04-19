'use strict';

const Service = require('egg').Service;
const UUID = require('uuid/v1');
const R = require('ramda');

const articlePick = ['slug', 'title', 'description', 'body', 'tagList', 'updated_at', 'created_at', 'favoritesCount']

module.exports = app => {
  // 表关联定义
  app.model.User.hasMany(app.model.Article, { foreignKey: 'id' });
  app.model.Article.belongsTo(app.model.User, { foreignKey: 'userId' });

  return class ArticleService extends Service {
    async getArticlesByQuery(query) {
      console.log(query);
    }

    async getArticlesBySlug(slug) {
      const { ctx } = this;

      const [articleRow] = await ctx.model.Article.findAll({
        attributes: [ ...articlePick, 'id' ],
        where: { slug },
        include: [
          { model: ctx.model.User, attributes: ['username', 'bio', 'image'] },
        ]
      })

      return articleRow.toJSON()
    }

    async getArticlesByFeed(follows) {
      console.log(follows);
    }

    async createAnArticle(data) {
      const { ctx } = this;
      const slug = UUID(data.title);

      const pick = R.pick(articlePick);

      const articleData = await ctx.model.Article.create({ slug, ...data })
        .then(R.compose(pick, row => row && row.toJSON()))
        .catch(e => ctx.throw(444, 'createAnArticle fail'));
      return articleData;
    }

    async updateArticleBySlug(slug, data) {
      const { ctx } = this;

      const pick = R.pick(articlePick);

      const [updateCount, [updateRow]] = await ctx.model.Article.update(data, { where: { slug }, individualHooks: true })
      if (updateCount < 1) ctx.throw(444, 'updateArticleBySlug fail');

      return R.compose(pick, row => row && row.toJSON())(updateRow);
    }

    async deleteArticleBySlug(slug) {
      const { ctx } = this;

      const deleteCount = await ctx.model.Article.destroy({ where: { slug } });
      if (deleteCount < 1) throw new Error('deleteArticleBySlug fail');

      return 'delete success'
    }
  }
}