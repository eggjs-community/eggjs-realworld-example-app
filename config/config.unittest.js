'use strict';

module.exports = () => {
  const config = exports = {};

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
