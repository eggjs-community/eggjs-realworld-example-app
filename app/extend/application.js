'use strict';

module.exports = {
  generateJWT(username) {
    const { config } = this;
    const token = this.jwt.sign({ username }, config.jwt.secret);
    return token;
  },
};
