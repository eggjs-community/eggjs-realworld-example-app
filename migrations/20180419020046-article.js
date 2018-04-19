'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const { STRING, DATE, UUID, UUIDV4, TEXT, INTEGER  } = Sequelize;
    return queryInterface.createTable('article', {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      slug: {
        type: UUID,
        unique: true,
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
      userId: {
        type: UUID,
        allowNull: false,
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('article');
  }
};
