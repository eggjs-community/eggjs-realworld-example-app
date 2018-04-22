'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('tags', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('tags');
  },
};
