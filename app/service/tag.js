'use strict';

const Service = require('egg').Service;

class TagService extends Service {
  async list() {
    return this.ctx.model.Tag.findAll();
  }
}

module.exports = TagService;
