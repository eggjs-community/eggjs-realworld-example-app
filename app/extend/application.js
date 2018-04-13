'use strict';

module.exports = {
  generateJWT(username) {
    const { config } = this;
    const token = this.jwt.sign({ username }, config.jwt.secret);
    return token;
  },
  getToken(ctx) {
    return ctx.request.headers.authorization.split(' ')[1];
  },
};
