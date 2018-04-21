'use strict';

module.exports = {
  generateJWT(username) {
    const { config } = this;
    const token = this.jwt.sign({ username }, config.jwt.secret);
    return token;
  },
  getToken(ctx) {
    const authorization = ctx.request.headers.authorization;
    if (!authorization) return null;
    return authorization.split(' ')[1];
  },
  verifyToken(ctx) {
    const { config } = this;
    const token = this.getToken(ctx);
    if (!token) return null;
    return this.jwt.verify(token, config.jwt.secret);
  },
  getUserJson(user) {
    delete user.password;
    user.token = this.generateJWT(user.username);
    return user;
  },
};
