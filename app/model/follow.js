'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const Follow = app.model.define('follow', {
    userId: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    followId: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    timestamps: true,
    underscored: false,
    tableName: 'follows',
  });

  Follow.associate = function() {
    app.model.Follow.belongsToMany(app.model.User, { through: 'follow', foreignKey: 'userId' });
  };

  return Follow;
};
