'use strict';

const Service = require('egg').Service;

const userExclude = [ 'createdAt', 'updatedAt', 'password' ];

class CommentService extends Service {
  async create(data) {
    const { ctx } = this;
    const article = await ctx.model.Article.findOne({ where: { slug: data.slug } });

    if (!article) ctx.throw(404, 'article not found');

    data.articleId = article.id;
    const comment = await ctx.model.Comment.create(data).then(row => row && row.toJSON());
    const user = await ctx.model.User.findOne({
      where: { id: comment.userId },
      attributes: { exclude: userExclude },
    }).then(row => row && row.toJSON());
    user.following = false;
    delete comment.userId;
    delete comment.articleId;
    delete user.id;
    return { ...comment, ...{ author: user } };
  }

  async fetch(slug, userId) {
    const { ctx } = this;
    const article = await ctx.model.Article.findOne({ where: { slug } });

    if (!article) ctx.throw(404, 'article not found');

    const comments = await ctx.model.Comment.findAll({
      order: [[ 'createdAt', 'DESC' ]],
      where: {
        articleId: article.id,
      },
      include: [
        {
          model: ctx.model.User,
          as: 'author',
          attributes: { exclude: userExclude },
          include: [
            { model: ctx.model.Follow, attributes: [ 'followerId' ] },
          ],
        },
      ],
    }).then(rows => rows.length && rows.map(r => r && r.toJSON()));

    if (!comments) return [];

    return comments.map(item => {
      item.author.following = item.author.follows.some(sub => sub.followerId === userId);
      delete item.author.follows;
      delete item.userId;
      delete item.articleId;
      delete item.author.id;
      return item;
    });
  }

  async delete({ id, userId }) {
    const { ctx } = this;
    const delCount = await ctx.model.Comment.destroy({ where: { id, userId } });
    return delCount;
  }
}

module.exports = CommentService;
