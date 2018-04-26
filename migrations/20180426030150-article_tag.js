'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('articleTag', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      articleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('articleTag');
  },
};
