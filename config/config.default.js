'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1523415779575_1091';

  // add your config here
  config.middleware = [ 'errorHandler', 'notfoundHandler' ];

  config.jwt = {
    secret: '123456',
  };

  exports.sequelize = {
    dialect: 'mysql',
    database: 'realworld',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
    timezone: '+08:00', // 东八时区
  };

  exports.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
