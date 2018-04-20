'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const Follow = app.model.define('follow', {
    followerUsername: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
    },
    followedUsername: {
      type: STRING,
      primaryKey: true,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: false,
    tableName: 'follows',
  }, {
    indexes: [
    ],
  });

  Follow.prototype.associate = function() {
  };

  return Follow;
};
