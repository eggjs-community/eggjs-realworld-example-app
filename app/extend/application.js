'use strict';

module.exports = {
  generateJWT(id, username) {
    const { config } = this;
    const token = this.jwt.sign({ id, username }, config.jwt.secret);
    return token;
  },
  getToken(ctx) {
    return ctx.request.headers.authorization.split(' ')[1];
  },
};
