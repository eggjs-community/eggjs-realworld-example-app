'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  async getArticlesByQuery(query) {
    console.log(query);
  }

  async getArticlesBySlug(slug) {
    console.log(slug);
  }

  async getArticlesByFeed(follows) {
    console.log(follows);
  }

  async createAnArticle(article) {
    console.log(article);
  }

  async updateArticleBySlug(slug) {
    console.log(slug);
  }

  async deleteArticleBySlug(slug) {
    console.log(slug);
  }
}

module.exports = ArticleService;
