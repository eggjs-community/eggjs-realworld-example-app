'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1523415779575_1091';

  // add your config here
  config.middleware = [];

  config.jwt = {
    secret: '123456',
  };

  exports.sequelize = {
    dialect: 'mysql',
    database: 'test',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
  };

  return config;
};
