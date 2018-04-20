'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { STRING, DATE } = Sequelize;
    return queryInterface.createTable('follows', {
      followerUsername: {
        type: STRING,
        allowNull: false,
        primaryKey: true,
      },
      followedUsername: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
      },
      created_at: DATE,
      updated_at: DATE,
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
