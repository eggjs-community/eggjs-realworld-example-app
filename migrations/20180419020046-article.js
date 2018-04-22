'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    const { STRING, DATE, UUID, UUIDV4, TEXT, INTEGER } = Sequelize;
    return queryInterface.createTable('articles', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      slug: {
        type: UUID,
        unique: true,
        defaultValue: UUIDV4,
        allowNull: false,
      },
      title: {
        type: STRING,
        allowNull: false,
      },
      description: {
        type: STRING,
        allowNull: false,
      },
      body: {
        type: TEXT,
        allowNull: false,
      },
      userId: {
        type: INTEGER,
        allowNull: false,
      },
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('articles');
  },
};
