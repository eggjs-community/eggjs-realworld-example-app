'use strict';

module.exports = app => {
  const { INTEGER, TEXT, UUID } = app.Sequelize;

  const Comment = app.model.define('comment', {
    body: {
      type: TEXT,
      allowNull: false,
    },
    userId: {
      type: INTEGER,
      allowNull: false,
    },
    slug: {
      type: UUID,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: false,
    tableName: 'comments',
  });

  Comment.associate = function() {
    app.model.Comment.belongsTo(app.model.User, { as: 'author', foreignKey: 'userId' });
  };

  return Comment;
};
