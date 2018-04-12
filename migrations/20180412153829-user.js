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
        validate: {
          isLowercase: true,
          notEmpty: true,
        },
      },
      email: {
        type: STRING,
        unique: true,
        validate: {
          isEmail: true,
          isLowercase: true,
          notEmpty: true,
        },
      },
      bio: STRING,
      image: STRING,
      password: STRING,
    }, {
      timestamps: true,
    });
  },

  down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('users');
  },
};
