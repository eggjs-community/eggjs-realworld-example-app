'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { INTEGER, DATE } = Sequelize;
    return queryInterface.createTable('follows', {
      userId: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      followId: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
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
    return queryInterface.dropTable('follows');
  },
};
