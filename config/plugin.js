'use strict';

// had enabled by egg
// exports.static = true;
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
