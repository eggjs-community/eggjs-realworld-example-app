'use strict';

module.exports = app => {
  const Follow = app.model.define('follow', {}, {
    timestamps: true,
    underscored: false,
    tableName: 'follows',
  });

  Follow.associate = function() {
    app.model.Follow.belongsTo(app.model.User, { foreignKey: 'userId' });
    app.model.Follow.belongsTo(app.model.User, { foreignKey: 'followId' });
  };

  return Follow;
};
