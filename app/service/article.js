'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  async getArticlesByQuery(query) {}

  async getArticlesBySlug(slug) {}

  async getArticlesByFeed(follows) {}

  async createAnArticle(article) {}

  async updateArticleBySlug(slug) {}

  async deleteArticleBySlug(slug) {}
}

module.exports = ArticleService;
