'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    const { STRING, JSON, DATE, UUID, UUIDV4, TEXT, INTEGER } = Sequelize;
    return queryInterface.createTable('articles', {
      slug: {
        type: UUID,
        unique: true,
        primaryKey: true,
        defaultValue: UUIDV4,
        allowNull: false,
        validate: {
          isUUID: 4,
        },
      },
      title: {
        type: STRING,
        allowNull: false,
      },
      description: {
        type: STRING,
      },
      body: {
        type: TEXT,
        allowNull: false,
      },
      tagList: {
        type: JSON,
        defaultValue: [],
      },
      favoritesCount: {
        type: INTEGER,
        defaultValue: 0,
      },
      username: {
        type: STRING,
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
