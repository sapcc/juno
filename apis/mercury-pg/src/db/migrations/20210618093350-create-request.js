"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      requesterName: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      requesterID: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      lastProcessorID: {
        type: Sequelize.INTEGER,
      },
      kind: {
        type: Sequelize.STRING,
      },
      priority: {
        type: Sequelize.INTEGER,
      },
      subject: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      payload: {
        type: Sequelize.JSON,
      },
      region: {
        type: Sequelize.STRING,
      },
      domainID: {
        type: Sequelize.STRING,
      },
      domainName: {
        type: Sequelize.STRING,
      },
      projectID: {
        type: Sequelize.STRING,
      },
      projectName: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.JSON,
      },
      state: {
        type: Sequelize.STRING,
      },
      stateDetails: {
        type: Sequelize.STRING,
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Requests")
  },
}
