'use strict';

const Service = require('egg').Service;

const userExclude = [ 'createdAt', 'updatedAt', 'password' ];

class CommentService extends Service {
  async addCommentsToArticle(newComment) {
    const { ctx } = this;
    const comment = await ctx.model.Comment.create(newComment).then(row => row && row.toJSON());
    const user = await ctx.model.User.findOne({
      where: { id: comment.userId },
      attributes: { exclude: userExclude },
    }).then(row => row && row.toJSON());
    delete comment.userId;
    return { ...comment, ...{ author: user } };
  }

  async getCommentsFromArticleSlug(slug, userId) {
    const { ctx } = this;
    const comments = await ctx.model.Comment.findAll({
      where: { slug },
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
    return comments.map(item => {
      item.author.following = item.author.follows.some(sub => sub.followerId === userId);
      delete item.author.follows;
      delete item.userId;
      return item;
    });
  }

  async deleteCommentBySlugAndId({ slug, id, userId }) {
    const { ctx } = this;
    const delCount = await ctx.model.Comment.destroy({ where: { slug, id, userId } });
    return delCount > 0 ? '删除平路成功' : '删除评论失败';
  }
}

module.exports = CommentService;
