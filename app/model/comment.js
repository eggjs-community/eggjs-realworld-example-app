'use strict';

module.exports = app => {
  const { TEXT } = app.Sequelize;

  const Comment = app.model.define('comment', {
    body: {
      type: TEXT,
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
