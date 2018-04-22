'use strict';

module.exports = {
  generateJWT(id, username) {
    const { config } = this;
    const token = this.jwt.sign({ id, username }, config.jwt.secret);
    return token;
  },
  verifyToken(ctx) {
    const { config } = this;
    const token = config.jwt.getToken(ctx);
    if (!token) return null;
    return this.jwt.verify(token, config.jwt.secret);
  },
  getProfileJson(user, following) {
    user = user.get();
    following = !!following;
    return {
      username: user.username,
      bio: user.bio || null,
      image: user.image || null,
      following,
    };
  },
  getUserJson(user, ctx) {
    user = user.get();
    const { config } = this;
    let token = config.jwt.getToken(ctx);
    if (!token) {
      token = this.generateJWT(user.id, user.username);
    }
    return {
      username: user.username,
      token,
      email: user.email,
      bio: user.bio || null,
      image: user.image || null,
    };
  },
};
