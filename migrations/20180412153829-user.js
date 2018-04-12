'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { STRING } = Sequelize;
    return queryInterface.createTable('users', {
      username: {
        type: STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate: {
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
    }, {
      timestamps: true,
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
