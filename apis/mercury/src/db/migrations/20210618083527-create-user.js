"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("Users", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        fullName: {
          type: Sequelize.STRING,
        },
        settings: {
          type: Sequelize.JSON,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => queryInterface.addIndex("Users", ["name"]))
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users")
  },
}
