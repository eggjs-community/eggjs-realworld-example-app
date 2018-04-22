'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { STRING, DATE, INTEGER } = Sequelize;
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      username: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,19}$/i,
          isLowercase: true,
        },
      },
      email: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          isLowercase: true,
        },
      },
      bio: STRING,
      image: STRING,
      password: {
        type: STRING,
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
    return queryInterface.dropTable('users');
  },
};
