'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const Tag = app.model.define('tag', {
    name: {
      type: STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: false,
    tableName: 'tags',
  });

  Tag.associate = function() {
  };

  return Tag;
};
