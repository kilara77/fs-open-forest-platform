'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' },
      email: { type: Sequelize.STRING, field: 'email' },
      role: { type: Sequelize.STRING, field: 'role' },
      name: { type: Sequelize.STRING, field: 'name' },
      forests: { type: Sequelize.ARRAY(Sequelize.STRING), field: 'forests' },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
