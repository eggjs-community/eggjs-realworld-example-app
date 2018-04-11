'use strict';

// had enabled by egg
// exports.static = true;
exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

exports.passport = {
  enable: true,
  package: 'egg-passport'
}

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}