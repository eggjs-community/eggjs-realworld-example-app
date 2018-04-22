'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('articleTags', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      articleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('articleTags');
  },
};
