'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('articleTag', {
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
