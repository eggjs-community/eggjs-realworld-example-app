'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { DATE, INTEGER, TEXT } = Sequelize;
    return queryInterface.createTable('comments', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      body: {
        type: TEXT,
        allowNull: false,
      },
      userId: {
        type: INTEGER,
        allowNull: false,
      },
      articleId: {
        type: INTEGER,
        allowNull: false,
      },
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  down(queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('comments');
  },
};
