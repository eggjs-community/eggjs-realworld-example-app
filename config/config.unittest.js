'use strict';

module.exports = () => {
  const config = exports = {};

  exports.sequelize = {
    dialect: 'mysql',
    database: 'realworld_test',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
    timezone: '+08:00', // 东八时区
  };

  return config;
};
